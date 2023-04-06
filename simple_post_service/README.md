# Toolchain installation
Please refer to ../web/README.md.

# Hosts file tweak

## Windows platfoorm
1. Open "C:\Windows\System32\drivers\etc\hosts" in Notepad++.
2. Add below line at the end of the file.
```sh
  127.0.0.1 posts.com
```
3. Try to save the file.
4. The prompt will be shown to launch Notepad++ in Administrator mode. Click on *Yes* button. Click on *Yes* button of UAC prompt.
5. Now save the file.

## Mac OS platform
1. Run below command in Terminal.
```sh
  sudo vi /etc/hosts
```
2. Add below line at the end of the file.
```sh
  127.0.0.1 posts.com
```


# Run post service

## Run Skaffold
1. Go to "..\web\simple_post_service" folder.
2. Run below command in PowerShell.
```sh
  skaffold dev
```
3. First time Skaffold launch often fails. Just run it again if it fails.

## Open react app
1. Open Chrome.
2. Go to "https://posts.com" page.
3. It will show an error that *Your connection isn't private". DO NOT TRY TO CONTINUE TO post.com (unsafe) through Advanced option.
4. Manually type *thisisunsafe* to skip the error.

## Close all services
1. Stop Skaffold.
2. Run following command in Powershell (for windows) to stop all kubernetes pods and services
```sh
  skaffold delete --namespace=default
```
In MacOS, even without using Skaffold, you can stop all kubernetes pods and services.<br/>
<br/>
You can also stop kubernetes pods and services without Skaffold.<br/>
Go to "..\web\simple_post_service\infra\k8s" folder.<br/>
Run below command in PowerShell/Terminal -
```sh
  kubectl delete -f .
```
