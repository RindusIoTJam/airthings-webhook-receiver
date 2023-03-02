# airthings-webhook-receiver

Little application to receive data from Airthings send by the Webhook integration.

# Installation

## Service

```bash
$ sudo -i
$ cd /opt
$ git checkout git@github.com:RindusIoTJam/airthings-webhook-receiver.git
$ cd airthings-webhook-receiver/src
$ npm install
$ cp ../contrib/airthings-webhook-receiver.service /lib/systemd/system/airthings-webhook-receiver.service
$ systemctl daemon-reload
$ systemctl enable airthings-webhook-receiver.service
$ systemctl start airthings-webhook-receiver.service && journalctl -fu airthings-webhook-receiver.service
```

## Apache forwarding (SSL endpoint)

