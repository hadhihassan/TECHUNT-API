import stripeModule from "stripe";
const stripe = stripeModule(process.env.STRIP_SECRET_KEY);

export class StripPayment {
    constructor(address) {
        this.stripe = stripe
    }
    async createCustomer(address) {
        const customer = await stripe.customers.create({
            shipping:address
        });
        return customer.id
    }
    async createLineItems(){
        return [{
            price_data: {
                currency: "INR",
                product_data: {
                    name: "Proposal Service Charge",
                },
                unit_amount: Math.round(500 * 100),
            },
            quantity: 1,
        }];
    }
    async makePayment(address){
        const customerId = await this.createCustomer(address)
        const lineItems = await this.createLineItems()

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/payment-succes",
            cancel_url: "http://localhost:5173/payment-failed",
            customer: customerId
        });
        return session.id
    }
}