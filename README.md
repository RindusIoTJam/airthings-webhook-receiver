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

## Airthings SSL endpoint

Ensure the endpoint is secured by SSL with e.g. _Apache_ adding the following to you VirtualHost:

```
ProxyPass        /airthings/ http://127.0.0.1:9883/
ProxyPassReverse /airthings/ http://127.0.0.1:9883/
```

_STunnel_ could also be an option.

## Airthings Webhook

Setup `https://{fqdn-of-your-server}/airthings/hook` as the webhook URL.

# Local Testing

```
curl -XPOST http://127.0.0.1:9883/hook -d '{"key1":"value1","key2":"value2"}' -H "Content-Type: application/json"
```