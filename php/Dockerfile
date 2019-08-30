FROM php:7.3-fpm

ENV ORACLE_HOME=/opt/oracle/instantclient_12_2
ENV TNS_ADMIN=/opt/oracle/instantclient_12_2/network/admin
ENV LD_LIBRARY_PATH=/opt/oracle/instantclient_12_2:$LD_LIBRARY_PATH

RUN apt-get update -y  
RUN apt-get install -y libpng-dev
RUN apt-get install -y mariadb-client sendmail wget unzip
RUN apt-get install -y vim mlocate
RUN updatedb

RUN mkdir -p /opt/oracle/instantclient_12_2/network/admin

COPY ./instantclient-basic-linux.x64-12.2.0.1.0.zip /opt/oracle
COPY ./instantclient-sdk-linux.x64-12.2.0.1.0.zip /opt/oracle
COPY ./instantclient-jdbc-linux.x64-12.2.0.1.0.zip /opt/oracle
COPY ./instantclient-odbc-linux.x64-12.2.0.1.0-2.zip /opt/oracle
COPY ./instantclient-sqlplus-linux.x64-12.2.0.1.0.zip /opt/oracle
COPY ./tnsnames.ora /opt/oracle/instantclient_12_2/network/admin

RUN unzip /opt/oracle/instantclient-basic-linux.x64-12.2.0.1.0.zip -d /opt/oracle \
    && unzip /opt/oracle/instantclient-sqlplus-linux.x64-12.2.0.1.0.zip -d /opt/oracle \
    && unzip /opt/oracle/instantclient-jdbc-linux.x64-12.2.0.1.0.zip -d /opt/oracle \
    && unzip /opt/oracle/instantclient-odbc-linux.x64-12.2.0.1.0-2.zip -d /opt/oracle \
    && unzip /opt/oracle/instantclient-sdk-linux.x64-12.2.0.1.0.zip -d /opt/oracle \
    && ln -s /opt/oracle/instantclient_12_2/libclntsh.so.12.1 /opt/oracle/instantclient_12_2/libclntsh.so \
    && ln -s /opt/oracle/instantclient_12_2/libocci.so.12.1 /opt/oracle/instantclient_12_2/libocci.so \
    && rm -rf /opt/oracle/*.zip \
    && chmod -R 755 /opt/oracle/instantclient_12_2

RUN docker-php-ext-install mysqli \ 
    && docker-php-ext-install tokenizer \ 
    && docker-php-ext-install gd  \
    && docker-php-ext-configure oci8 --with-oci8=instantclient,/opt/oracle/instantclient_12_2 \
    && docker-php-ext-install oci8 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
