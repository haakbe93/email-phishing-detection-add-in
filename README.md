# Email phishing detection add-in application

This repository contains files used in the development of an email phishing detection application. The application was developed in Microsoft's Office Outlook add-in environment to be able to run on Outlook Live (www.outlook.com).

## Result

The application has the following functionailties:

1.	Routing between application pages
2.	GUI for accessing functionalities
3.	User manual
4.	Percent score system for rating section’s functionalities
5.	Sender section:
  - Fetching sender’s display name and email address
  - Comparing similarities between them
  - Fetching sender’s IP address

6.	Content section:
  - Fetching profile name of email user
  - Comparing email body text to phishing word list
7.	Link section:
  - Fetching links found in email
  - Checking encoding of links
  - Checking links usage of HTTP/HTTPS
  - Checking links usage of redirection
  - Checking duplication of links
8.	Authentication section:
  - Fetching email authentication protocol results
  - Checking results of SPF
  - Checking results of DKIM
  - Checking results of DMARC
9.	Attachment section:
  - Fetching email attachments
  - Counting and displaying file names
  
A demon of the application, illustrating its functionailites can be seen at:

  https://youtu.be/T9jzo4Z1yLk

### Appliction detection test

A application detection test was performed to measure its capabilites of seperating phishing emails from legitimate emails.
The test was performed on 300 emails, 150 legitimate emails and 150 phishing emails.

## Improvements

## About project

## Abstract

## Tools and frameworks

Following tools an frameworks where used to develop the application.

### Javascript
This template is written using JavaScript. For the [TypeScript](http://www.typescriptlang.org/) version of this template, go to [Office-Addin-TaskPane-React](https://github.com/OfficeDev/Office-Addin-TaskPane-React).

### Yeoman generator
This repository contains the source code used by the [Yo Office generator](https://github.com/OfficeDev/generator-office) when you create a new Office Add-in that appears in the task pane. You can also use this repository as a sample to base your own project from if you choose not to use the generator. 

### Visual Studio Code (IDE)


## Additional resources

* [Office add-in documentation](https://docs.microsoft.com/office/dev/add-ins/overview/office-add-ins)
* More Office Add-in samples at [OfficeDev on Github](https://github.com/officedev)

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Copyright

Copyright (c) 2019 Microsoft Corporation. All rights reserved.
