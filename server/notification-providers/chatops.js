const NotificationProvider = require("./notification-provider");
const axios = require("axios");
const { DOWN, UP } = require("../../src/util");

class ChatOps extends NotificationProvider {

    name = "ChatOps";

    async send(notification, msg, monitorJSON = null, heartbeatJSON = null) {

        let okMsg = "Sent Successfully.";
        let chatOpsAPIUrl = notification.chatOpsUrl;
        let chatOpsChannel = notification.chatOpsChannel;
        let chatOpsToken = notification.chatOpsToken;

        let msgSubj = notification.msgSubj;

        let msgBody = notification.chatOpsToken;

        try {
            if (heartbeatJSON == null) {
                msgBody = "BSD Monitoring Service Test Successful!";
            } else if (heartbeatJSON["status"] === DOWN) {
                msgBody = "BSD Monitoring Service Alert: [🔴 Down]\n" + "Name: " + monitorJSON["name"] + " \n" + heartbeatJSON["msg"] + "\nTime (UTC): " + heartbeatJSON["time"];
            } else if (heartbeatJSON["status"] === UP) {
                msgBody = "BSD Monitoring Service Alert: [✅ Up]\n" + "Name: " + monitorJSON["name"] + " \n" + heartbeatJSON["msg"] + "\nTime (UTC): " + heartbeatJSON["time"]
            }
           
            let data = {
                channel_id: chatOpsChannel,
                message: "@ALL",
                props: {
                    attachments: [
                        {
                            pretext: msgSubj,
                            text: msgBody
                        },
                    ]
                },
            };
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + chatOpsToken
                }
            };

            await axios.post(chatOpsAPIUrl, data, config);
            return okMsg;

        } catch (error) {
            this.throwGeneralAxiosError(error);
        }

    }

}

module.exports = ChatOps;
