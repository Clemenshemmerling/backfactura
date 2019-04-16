FROM php:7.0-fpm

RUN mkdir -p /opt/oracle/instantclient_12_2/network/admin

ENV ORACLE_HOME=/opt/oracle/instantclient_12_2
ENV TNS_ADMIN=/opt/oracle/instantclient_12_2/network/admin
ENV LD_LIBRARY_PATH=/opt/oracle/instantclient_12_2:$LD_LIBRARY_PATH

RUN apt-get update -y  
RUN apt-get install -y libpng-dev
RUN apt-get install -y mysql-client sendmail wget unzip

COPY  ./instantclient-basic-linux-12.2.0.1.0.zip /opt/oracle
COPY  ./instantclient-sdk-linux-12.2.0.1.0.zip /opt/oracle
COPY  ./instantclient-odbc-linux-12.2.0.1.0-2.zip /opt/oracle
COPY  ./instantclient-sqlplus-linux-12.2.0.1.0.zip /opt/oracle

RUN unzip /opt/oracle/instantclient-basic-linux-12.2.0.1.0.zip -d /opt/oracle \
    && unzip /opt/oracle/instantclient-sqlplus-linux-12.2.0.1.0.zip -d /opt/oracle \
    && unzip /opt/oracle/instantclient-odbc-linux-12.2.0.1.0-2.zip -d /opt/oracle \
    && unzip /opt/oracle/instantclient-sdk-linux-12.2.0.1.0.zip -d /opt/oracle \
    && ln -s /opt/oracle/instantclient_12_2/libclntsh.so.12.2 /opt/oracle/instantclient_12_2/libclntsh.so \
    && ln -s /opt/oracle/instantclient_12_2/libocci.so.12.2 /opt/oracle/instantclient_12_2/libocci.so \
    && rm -rf /opt/oracle/*.zip    

RUN docker-php-ext-install mysqli \ 
    && docker-php-ext-install tokenizer \ 
    && docker-php-ext-install gd  

#https://github.com/merorafael/docker-php
# RUN docker-php-ext-configure pdo_oci --with-pdo-oci=instantclient,/opt/oracle/instantclient_12_2,12.2.0.1 \
#  && echo 'instantclient,/opt/oracle/instantclient_12_2/' | pecl install oci8 \
# RUN docker-php-ext-configure docker-php-ext-install \
#          pdo_oci \
#  && docker-php-ext-enable \
#          oci8

#https://github.com/merorafael/docker-php/blob/master/7.0/Dockerfile
RUN apt-get clean \
    && rm -rf /var/lib/apt/lists/*
