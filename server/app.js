const express = require("express");
const app = express();
const webpush = require('web-push');
const cors = require("cors")

const port = 3000;

const apiKeys = {
    publicKey: "BOMr0Iliq6O6WTHnuUtehi4uPBlZDBWqqEjp_rQRP6gUb1KFYzr9l8qRZwPAhxhI6qq8VLquvEBTkH2ncJFe4wM",
    privateKey: "1qwmLNqV_eq26zA_BE3b5n-cSU-JDwRw1LsU6ZTcCPo"
}

webpush.setVapidDetails(
    'mailto:mrahman9pk@gmail.com',
    apiKeys.publicKey,
    apiKeys.privateKey
)

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
})

const subDatable = [];


app.post("/save-subscription", (req, res) => {
    console.log(req.body)
    subDatable.push(req.body);
    res.json({ status: "Success", message: "Subscription saved!" })
})




app.get("/send-notification/:index", async (req, res) => {
    try {

        if (subDatable[req.params.index]?.endpoint) {
            const result = await webpush.sendNotification(subDatable[req.params.index], "Hello world").catch(error => error.message);
            return res.json({ "statue": "Success", "message": "Message sent to push service" });
        }
        return res.json({ "statue": "Failed", "message": "Sending failed notification.", });
    } catch (error) {
        return res.json({ "statue": "Failed", "message": "Sending failed notification.", errorIssue: error.message });

    }
})

app.listen(port, () => {
    console.log("Server running on port 3000!");
})