import stripeModule from "stripe";
const stripe = stripeModule(process.env.STRIP_SECRET_KEY);

export class StripPayment {
    constructor() {
        this.stripe = stripe
    }
    async createCustomer(address) {
        const customer = await stripe.customers.create({
            shipping: address
        });
        return customer.id
    }
    async createLineItems(name ="Proposal Service Charge",amount = 500) {
        return [{
            price_data: {
                currency: "INR",
                product_data: {
                    name: name,
                },
                unit_amount: Math.round(amount * 100),
            },
            quantity: 1,
        }];
    }
    async makePayment(address, id, isMilestonePay = false, amount) {
        const customerId = await this.createCustomer(address)
        const lineItems = await this.createLineItems(amount)
        let session
        if (isMilestonePay) {
            session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: lineItems,
                mode: "payment",
                success_url: `http://localhost:5173/client/contract/work-details/true`,
                cancel_url: "http://localhost:5173/client/contract/work-details/false",
                customer: customerId
            });
        } else {
            session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: lineItems,
                mode: "payment",
                success_url: `http://localhost:5173/payment-success/${id}`,
                cancel_url: "http://localhost:5173/payment-failed",
                customer: customerId
            });
        }
        if (session) {
            return session.id
        }
    }
    async makeSubsciptionPayment(name,address, id,amount) {
        const customerId = await this.createCustomer(address)
        const lineItems = await this.createLineItems(name,amount)
        let session
        session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `http://localhost:5173/plan`,
            cancel_url: "http://localhost:5173/plan",
            customer: customerId
        });
        if (session) {
            return session.id
        }
    }
}