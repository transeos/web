# Prerequisites 
* Node.js
* Docker
* Kubernetes
* Ingress-nginx
* Skaffold

# Installation in Windows
Please note WSL2 is required for running docker.
If you are running VMware, you would have to disable Intel VT-x/EPT or AMD-V/RVI in vm settings.

## Node.js
1. Download 64-bit msi from [Node.js download page](https://nodejs.org/en/download).
2. While installing, make sure check *Automatically install necessary tools. Note that this will also install Chocolatey ...* in *Tool for Native Modules* setup page.
3. After Node.js installation, Chocolatey installation will automatically start.

## Docker
1. Visit [docker hub](https://hub.docker.com/signup) to register for a DockerHub account.
2. If WSL is already not enabled, open PowerShell as Administrator and run the below command to enable and install Windows Subsystem for Linux.
```sh
  wsl --install
```
3. Reboot your computer.
4. Navigate to the [Docker Desktop installation page](https://docs.docker.com/desktop/install/windows-install) and download Docker Desktop.
5. Install Docker Desktop. Make sure "Use WSL 2" option is checked.
6. Installation may open a ubuntu shell to provide username and password.
7. Reboot your computer.
8. Open Docker Desktop and log in. If you run into error at opening of Docker Desktop, open PowerShell as Administrator and run below command.
```sh
  bcdedit /set hypervisorlaunchtype auto
```
9. Open PowerShell and run *docker* command to check whether Docker is working.

## Kubernetes
1. Open Docker Desktop.
2. Go to settings.
3. Click on *Kubernetes" at side panel.
4. Check *Enable Kubernetes*.
5. Click on *Apply & restart* button. Click on *Install* button.

## Ingress-nginx
Detailed installation can be found [here](https://kubernetes.github.io/ingress-nginx/deploy/#quick-start).

1. Assuming *Helm* is not installed, run Ingress-nginx from a yaml manifest. If there is a windows firewall prompt, allow access too both private and public network.
```sh
  kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.6.4/deploy/static/provider/cloud/deploy.yaml
```
2. A few pods should start in the *ingress-nginx* namespace. Open PowerShell as Administrator and run below command.
```sh
  kubectl get pods --namespace=ingress-nginx
```

## Skaffold
Detailed installation can be found [here](https://skaffold.dev/docs/install).
1. Install Skaffold using the Chocolatey package manager.
```sh
choco install -y skaffold
```


# Run post service

## Hosts file tweak 
1. Open "C:\Windows\System32\drivers\etc\hosts" in Notepad++.
2. Add *127.0.0.1 posts.com* at the end of the file.
3. Try to save the file.
4. The prompt will be shown to launch Notepad++ in Administrator mode. Click on *Yes* button. Click on *Yes* button of UAC prompt.
5. Now save the file.

## Run Skaffold
1. Go to "..\web\simple_post_service" folder.
2. Run below command in PowerShell.
```sh
skaffold dev
```
3. First time skaffold launch often fails. Just run it again if it fails.

## Open react app
1. Open Chrome.
2. Go to "https://posts.com" page.
3. It will show an error that *Your connection isn't private". DO NOT TRY TO CONTINUE TO post.com (unsafe) through Advanced option.
4. Manually type *thisisunsafe* to skip the error.
