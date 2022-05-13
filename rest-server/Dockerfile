FROM python:3.7-alpine

RUN pip install redis flask
RUN apk add --no-cache bash coreutils grep sed

COPY app.py .


CMD ["python", "app.py"]