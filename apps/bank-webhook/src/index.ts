import express from "express";
import db from "@repo/db/client";

const app = express();

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    try {
       
        await db.$transaction(async (prisma) => {
            const isProcessing = await prisma.onRampTransaction.findFirst({
                where: {
                    token: paymentInformation.token
                },
            });

            if(isProcessing?.status === "Processing") {  const existingBalance = await prisma.balance.findUnique({
                where: {
                    userId: Number(paymentInformation.userId)
                },
            });

          
          
            if (existingBalance) {
                await prisma.balance.update({
                    where: {
                        userId: Number(paymentInformation.userId)
                    },
                    data: {
                        amount: {
                            increment: Number(paymentInformation.amount),
                        },
                    },
                });
            } else {
               
                await prisma.balance.create({
                    data: {
                        userId: Number(paymentInformation.userId),
                        amount:  Number(paymentInformation.amount),
                        locked: 0, 
                    },
                });
            }

         
            await prisma.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token,
                },
                data: {
                    status: "Success",
                },
            });

            res.json({ message: "Captured" });
        
        } else{
                res.json({
                    meaasge1: " INVALID TRANSACTION"
                })
            }
          
        });

     
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error while processing webhook" });
    }
});

app.listen(3003, () => {
    console.log("Server running on port 3003");
});









// import express from "express";
// import db from "@repo/db/client";

// const app = express();

// app.use(express.json());

// // Define the route for deleting all data
// app.delete("/reset-database", async (req, res) => {
//     try {
//         await db.$transaction(async (prisma) => {
//             // Deleting data from all tables
//             await prisma.p2pTransfer.deleteMany({});
//             await prisma.balance.deleteMany({});
//             await prisma.onRampTransaction.deleteMany({});
//             await prisma.user.deleteMany({});
//         });

//         res.status(200).json({ message: "All data has been deleted" });
//     } catch (e) {
//         console.error("Failed to delete all data:", e);
//         res.status(500).json({ message: "Failed to delete data" });
//     }
// });

// app.listen(3003, () => {
//     console.log("Server running on port 3003");
// });
