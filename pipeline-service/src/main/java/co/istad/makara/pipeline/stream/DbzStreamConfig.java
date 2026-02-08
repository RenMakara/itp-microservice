package co.istad.makara.pipeline.stream;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;

import java.util.function.Consumer;
import java.util.function.Function;

@Configuration
public class DbzStreamConfig {

    /// For handle Tombstone Delete event, we need to consume `Consumer<Message<>>`
    ///  instead of GenericRecord directly, because when delete event happens,
    ///  the payload will be null, but the header will still exist, so we can
    /// check the header to know that it's a delete event and handle it accordingly.

    @Bean
    public Function<Message<Object>, Record> consumeDbzEvent(ObjectMapper objectMapper){
        return record -> {
            try {
                DebeziumEnvelope<Record> captureRecord =
                        objectMapper.readValue(record.getPayload().toString(),
                                new TypeReference<>() {
                                });

                return switch (captureRecord.getOp()) {
                    case "c", "r" -> {
                        System.out.println("Prepare to insert new record...");
                        Record after = captureRecord.getAfter();
                        System.out.println(after.getXmldata().getName());
                        yield after;
                    }
                    case "u" -> {
                        Record after = captureRecord.getAfter();
                        System.out.println("Prepare to update record...");
                        System.out.println("After: " + after.getXmldata().getName());
                        yield after;
                    }
                    case "d" -> {
                        System.out.println("Prepare to delete record...");
                        System.out.println("Deleted ID: " + captureRecord.getBefore().getRecid());
                        yield captureRecord.getBefore();
                    }
                    default -> throw new IllegalStateException("Invalid operation");
                };
            } catch (JsonProcessingException e) {
                System.out.println("Error deserialize!!");
            }
            return null;
        };
    }
}
