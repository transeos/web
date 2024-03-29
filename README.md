# Prerequisites 
* Node.js
* Docker
* Kubernetes
* Ingress-nginx
* Skaffold


# Installation in Windows
Please note WSL2 is required for running docker.<br/>
If you are running VMware, you would have to disable Intel VT-x/EPT or AMD-V/RVI in vm settings.

## Node.js
1. Download 64-bit msi from [Node.js download page](https://nodejs.org/en/download).
2. While installing, make sure check *Automatically install necessary tools. Note that this will also install Chocolatey ...* in *Tool for Native Modules* setup page.
3. After Node.js installation, Chocolatey installation will automatically start.
4. Open PowerShell and run *node -v* command to check if Node.js is installed.

## Docker
1. Visit [docker hub](https://hub.docker.com/signup) to register for a DockerHub account.
2. If WSL is already not enabled, open PowerShell as Administrator and run the below command to enable and install Windows Subsystem for Linux.
```sh
  wsl --install
```
3. Reboot your computer.
4. Navigate to the [Docker Desktop installation page](https://www.docker.com/products/docker-desktop) and download Docker Desktop.
5. Install Docker Desktop. Make sure "Use WSL 2" option is checked.
6. Installation may open a ubuntu shell to provide username and password.
7. Reboot your computer.
8. Open Docker Desktop and log in. If you run into error at opening of Docker Desktop, open PowerShell as Administrator and run below command.
```sh
  bcdedit /set hypervisorlaunchtype auto
```
9. Open PowerShell and run *docker* command to check if Docker is working properly.

## Kubernetes
1. Open Docker Desktop.
2. Go to settings.
3. Click on *Kubernetes" at side panel.
4. Check *Enable Kubernetes*.
5. Click on *Apply & restart* button. Click on *Install* button.
6. Open PowerShell and run *kubectl* command to check if Kubernetes is working.

## Ingress-nginx
Detailed installation instructions can be found [here](https://kubernetes.github.io/ingress-nginx/deploy/#quick-start).

1. Assuming *Helm* is not installed, run Ingress-nginx from a yaml manifest. If there is a windows firewall prompt, allow access too both private and public network.
```sh
  kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.6.4/deploy/static/provider/cloud/deploy.yaml
```
2. A few pods should start in the *ingress-nginx* namespace. Open PowerShell and run below command.
```sh
  kubectl get pods --namespace=ingress-nginx
```

## Skaffold
Detailed installation instructions can be found [here](https://skaffold.dev/docs/install).
1. Install Skaffold using the Chocolatey package manager.
```sh
  choco install -y skaffold
```
2. Open PowerShell and run *skaffold --help* command to check if Skaffold is working.


# Installation in Mac OS
Unlike Windows, Mac OS uses runs Docker inside VM instead of using Linux Subsystem.

## Homebrew
1. Run below command in Terminal.
```sh
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
2. Run *brew doctor* command to check if Homebrew is installed correctly.

## Node.js
1. Install Node.js using Homebrew.
```sh
  brew install node
```
2. Run *node -v* command to check if Node.js is installed correctly.

## Docker
1. Visit [docker hub](https://hub.docker.com/signup) to register for a DockerHub account.
2. Navigate to the [Docker Desktop installation page](https://www.docker.com/products/docker-desktop) and download Docker Desktop.
3. Install Docker Desktop.
4. Open Docker Desktop and log in.
5. Run *docker* command to check if Docker is working properly.

## Kubernetes
1. Steps are exactly same as that of Windows.

## Ingress-nginx
1. Steps are exactly same as that of Windows.

## Skaffold
Detailed installation can be found [here](https://skaffold.dev/docs/install).
1. Install Skaffold using Homebrew.
```sh
  brew install skaffold
```
2. Run *skaffold --help* command to check if Skaffold is working.
