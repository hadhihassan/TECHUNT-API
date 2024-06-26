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
    async createLineItems(name = "Proposal Service Charge", amount = 500) {
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
        try {
            const customerId = await this.createCustomer(address)
            const lineItems = await this.createLineItems(amount)
            let session
            if (isMilestonePay) {
                session = await stripe.checkout.sessions.create({
                    payment_method_types: ["card"],
                    line_items: lineItems,
                    mode: "payment",
                    success_url: `https://techunt.vercel.app/payment-success/s23432`,
                    cancel_url: "https://techunt.vercel.app/",
                    customer: customerId
                });
            } else {
                session = await stripe.checkout.sessions.create({
                    payment_method_types: ["card"],
                    line_items: lineItems,
                    mode: "payment",
                    success_url: `https://techunt.vercel.app/payment-success/${id}z`,
                    cancel_url: "https://techunt.vercel.app/",
                    customer: customerId
                });
            }
            if (session) {
                return session.id
            }
        } catch (error) {
            console.log(error)
        }
    }
    async makeSubsciptionPayment(name, address, id, amount) {
        try {
            const customerId = await this.createCustomer(address)
            const lineItems = await this.createLineItems(name, amount)
            let session
            session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: lineItems,
                mode: "payment",
                success_url: `https://techunt.vercel.app/payment-success/success`,
                cancel_url: "https://techunt.vercel.app/plan",
                customer: customerId
            });
            if (session) {
                return session.id
            }
        } catch (err) {
            console.log(session)
            return session.id
        }
    }
}