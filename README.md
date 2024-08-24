elegant-autoindex
=================

Stylist sortable autoindex template for nginx.

By Rémino Rem <https://remino.net/>

[Site](https://remino.github.io/elegant-autoindex/) | [Code](https://github.com/remino/elegant-autoindex)

## Description

Includes an XSLT file to transform the default nginx autoindex, a CSS file to style the result, and a JavaScript file to make the table sortable.

## Usage

First, clone the repo and link the files to the appropriate directories:

```sh
git clone https://github.com/remino/elegant-autoindex /opt/elegant-autoindex
ln -s /etc/nginx/snippets/elegant-autoindex-files.conf /opt/elegant-autoindex/etc/nginx/snippets/elegant-autoindex-files.conf
ln -s /etc/nginx/snippets/elegant-autoindex-enable.conf /opt/elegant-autoindex/etc/nginx/snippets/elegant-autoindex-enable.conf
ln -s /var/lib/nginx/elegant-autoindex /opt/elegant-autoindex/var/lib/nginx/elegant-autoindex
```

Then, include the `elegant-autoindex-enable.conf` snippet in your server configuration:

```nginx
server {
  # Location with file listings:
  location ~ /files/ {
    # ...
    include snippets/elegant-autoindex-enable.conf;
    # ...
  }

  include snippets/elegant-autoindex-files.conf;
}
```
