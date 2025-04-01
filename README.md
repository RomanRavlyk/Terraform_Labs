# Terraform Setup Guide for AWS

This guide will walk you through setting up Terraform, logging into AWS using the CLI, and running basic Terraform commands to initialize and apply your configuration.

## Prerequisites

- You need to have **Terraform** installed on your machine.
- You need to have **AWS CLI** installed and configured to authenticate to AWS.

### Step 1: Install Terraform

1. **Linux / macOS:**

   To install Terraform on Linux or macOS, follow these steps:

   ```bash
   # Download the Terraform binary
   curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
   sudo apt-get update && sudo apt-get install terraform
   ```
2. **Windows:**

    For Windows, download the latest Terraform binary from Terraform Downloads. Once downloaded, extract the .zip file and add it to your system's PATH.
    
    Verify the installation:
    
    Run the following command to check if Terraform was successfully installed:
    
    ```bash
    terraform --version
    ```
### Step 2: Install and Configure AWS CLI

  1. **Install AWS CLI:**

     Follow the [AWS CLI installation guide](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) for your operating system.

     For example, on Linux or macOS:

     ```bash
     curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
     unzip awscliv2.zip
     sudo ./aws/install
     ```
  2. **Configure AWS CLI:**

     To authenticate with AWS, you will need to configure your AWS credentials. Run the following command:
     ```bash
     aws configure
     ```
     You will be prompted to enter your:
  
     AWS Access Key ID
  
     AWS Secret Access Key
  
     Default region name (e.g., us-east-1)
  
     Default output format (e.g., json)
  
     Your AWS Access Key ID and Secret Access Key can be found in the IAM console under your user's security credentials
     
### Step 3: Initialize Terraform

  1. **Clone the repository (if applicable)**:

     If your Terraform configuration is part of a Git repository, clone it:

     ```bash
     git clone https://your-repo-url.git
     cd your-repo-directory
     ```
  2. **Initialize Terraform:**

     Run the following command to initialize the Terraform working directory. This will download the required provider plugins.
     ```bash
     terraform init
     ```
     Terraform will initialize your environment and set up the necessary components for the configuration to work.
  
### Step 4: Apply Terraform Configuration

  1. **Plan the Changes (Optional but recommended)**:

     Before applying the changes, it’s a good idea to check what changes Terraform will make by running:

     ```bash
     terraform plan
     ```
  2. **Apply the Configuration:**

     To apply the configuration and create or modify resources in AWS, run:
     ```bash
     terraform apply
     ```
     Terraform will prompt you to confirm that you want to make the changes. Type yes to proceed.
     Terraform will now apply the changes, creating or modifying AWS resources as specified in your configuration.
### Step 5: Clean Up (Optional)

  1. **Plan the Changes (Optional but recommended)**:

     If you no longer need the resources, you can destroy them by running:

     ```bash
     terraform destroy
     ```
     Terraform will ask you to confirm the destruction of the resources by typing yes.
### Troubleshooting
  - Terraform commands not found: If you get an error that Terraform is not found, make sure it is installed and in your system's PATH.
  - AWS CLI errors: If you encounter authentication errors, verify that your AWS credentials are correct using aws configure and ensure you have the necessary IAM permissions.
  - Permission Denied: Ensure your IAM user has the necessary permissions to perform the actions specified in the Terraform configuration.
### Additional Resources
  - [Terraform Documentation](https://developer.hashicorp.com/terraform/docs)
  - [AWS CLI Documentation](https://docs.aws.amazon.com/cli/)
