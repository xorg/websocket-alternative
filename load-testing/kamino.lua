wrk.method = "POST"
wrk.body   = '{"user_id":"000000000000000000000001","message":"test_message"}'
wrk.headers["Content-Type"] = "application/json"
wrk.headers["Set-Cookie"] = "session=eyJ0ZW5hbnRfbmFtZSI6bnVsbH0.Ymw6Cw.R1GXRE5imX8k9OTQPbKwJaOGIGE"
wrk.headers["Authorization"] = "Basic dGVzdGNsaWVudDo2YzFlY2FlNWI5MjMxMWJjZTc4NWYwZWM1MzhmNzljYw=="
wrk.headers["x-tenant"] = "yallo"
