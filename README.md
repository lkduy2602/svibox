# SViBox Google Apps Script

## Introduction

SViBox is a personal file storage project, with its backend developed using Google App Script and data stored in Google Sheets. This project serves as an exemplary model for those interested in learning about Google App Script and how to write data into Google Sheets. It also presents an idea for those who wish to create a cost-effective landing page.

## Required Installations

The project requires the installation of [@google/clasp](https://www.npmjs.com/package/@google/clasp#install). You can find it here.

## Installation

1. Open the terminal in the directory where you want to install the project.
2. Run `git clone https://github.com/lkduy2602/svibox.git` to pull the source code.
3. Run `clasp create --type sheets` to create a Google Script project with a sheet.

## Usage

1.  Run `clasp open` to open the project directly on Google Apps Script.
2.  If it’s your first time and there’s no information about the sheets, you need to create it first by running the `setUp()` function in the `main.gs` file.
3.  If you want to deploy, follow this guide. [Create and manage deployments](https://developers.google.com/apps-script/concepts/deployments#:~:text=API%20Executable,-To%20test%20an&text=At%20the%20top%20right%20of,test%20your%20API%20Executable%20deployment.)
4.  This project uses the POST method, so once you have the project link after deployment, use the POST method to execute it.

## Stay in touch

- Author - [Lê Khánh Duy](https://www.facebook.com/profile.php?id=100010487196120)
