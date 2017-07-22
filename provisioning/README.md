# 事前準備

競技用インスタンスにpython2.7をインストールする

```bash
$ sudo apt-get install python2.7
$ sudo ln -s /usr/bin/python2.7 /usr/bin/python
```

# 競技用インスタンスのセットアップ方法

image/ansible以下に入っているplaybookを順番に実行。

```
$ ansible-playbook -i hosts image/ansible/*.yml
```

## ssh config の例

```
Host shanai-isucon-app-01
  IdentityFile ~/.ssh/xxx.pem
  HostName xxx.xxx.xxx.xxx
  User admin
```
