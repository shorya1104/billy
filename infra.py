import subprocess
def check_node_version():
    try:
        node_version = subprocess.check_output(['which', 'docker']).decode("utf-8").strip()
        print(f"Node.js version {node_version} already installed.")
    except subprocess.CalledProcessError:
        print("Node.js is not installed. Installing Node.js now...")
        install_node()

def install_node():
    try:
        subprocess.run(["sudo", "apt-get", "update"])
        subprocess.run(["sudo", "apt-get", "install", "-y", "nodejs"])
        subprocess.run(["sudo", "apt-get", "install", "-y", "npm"])
        print("Node.js and npm installed successfully.")
    except Exception as e:
        print("Failed to install Node.js and npm.")
        print(e)

check_node_version()
