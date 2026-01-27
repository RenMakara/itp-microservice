
import AccountComponent from "@/features/accounts/components/AccountComponent";

export default function Page() {

    return (
    <div>
        <section className="to-muted from-background">
            <div className="relative px-25">
                <h1 className="text-2xl font-bold">Token Handler Pattern</h1>
                <AccountComponent/>
            </div>
            </section>
    </div>
    );
}