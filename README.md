# airthings-webhook-receiver

Little application to receive data from Airthings send by the Webhook integration.

# Installation

## Service

The service keeps your airthings-webhook-receiver up and running while recording data with systemd-journal.

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

Ensure the endpoint is secured by SSL with e.g. _Apache_ adding the following to you SSL VirtualHost:

```apache
ProxyPass        /airthings/ http://127.0.0.1:9883/
ProxyPassReverse /airthings/ http://127.0.0.1:9883/
```

_STunnel_ could also be an option.

## Airthings Webhook

Setup `https://{fqdn-of-your-server}/airthings/hook` as the webhook URL.

## Promtail

Promtail reads the journal and stores data in Grafana/Loki. Setup

```yaml
scrape_configs:
- job_name: journal
  journal:
    json: false
    max_age: 12h
    labels:
      job: systemd-journal
  pipeline_stages:
  - json:
      expressions:
        data: data[0]
  - json:
      expressions:
        serialNumber:
        measurementSystem:
      source: data
  - labels:
      serialNumber:
  - labels:
      measurementSystem:
  - output:
      source: data
  relabel_configs:
    - source_labels: ['__journal__systemd_unit']
      target_label: 'unit'
```

## Grafana/Loki

```logql
avg_over_time(
  {job="systemd-journal",unit="airthings-webhook-receiver.service"}
  | json
  | unwrap temp
  | __error__="" [5m]
) by(serialNumber)
```

### Local Testing

```bash
$ curl -XPOST http://127.0.0.1:9883/hook -d '{"key1":"value1"}' -H "Content-Type: application/json"
```