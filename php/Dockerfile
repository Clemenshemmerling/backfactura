FROM php:7.0-fpm

ENV ORACLE_HOME=/opt/oracle/instantclient_18_5

ENV LD_LIBRARY_PATH=$ORACLE_HOME/

RUN apt-get update && apt-get \
    install -y mysql-client sendmail libpng-dev wget unzip

RUN mkdir /opt/oracle

COPY  ./instantclient-basic-linux.x64-18.5.0.0.0.zip /opt/oracle

COPY ./instantclient-sdk-linux.x64-18.5.0.0.0.zip /opt/oracle

RUN unzip /opt/oracle/instantclient-basic-linux.x64-18.5.0.0.0.zip -d /opt/oracle \
    && unzip /opt/oracle/instantclient-sdk-linux.x64-18.5.0.0.0.zip -d /opt/oracle \
    && ln -s /opt/oracle/instantclient_18_5/libclntshcore.so.18.5 /opt/oracle/instantclient_18_5/libclntshcore.so \
    && rm -rf /opt/oracle/*.zip    

RUN docker-php-ext-install mysqli \ 
    && docker-php-ext-install tokenizer \ 
    && docker-php-ext-install gd \
#    && docker-php-ext-install pdo_oci \
#    && docker-php-ext-enable oci8