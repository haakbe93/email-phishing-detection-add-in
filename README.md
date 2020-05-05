# Email phishing detection application

This repository contains files used in the development of an email phishing detection application. The application was developed in Microsoft's Office Outlook add-in environment to be able to run on Outlook Live (www.outlook.com).

## Result

The application has the following functionailties:

1.  Routing between application pages
2.  GUI for accessing functionalities
3.  User manual
4.  Percent score system for rating section’s functionalities
5.  Sender section:
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


Screenshots of the add-in running in Outlook Live:
![](figures/add_in_in_outlook.png)

Close up of add-in:

![](figures/add_in_close_up.png)

### Appliction detection test

A application detection test was performed to measure the application capabilites of seperating phishing emails from legitimate emails.
The test was performed on 300 emails, 150 legitimate emails and 150 phishing emails.

The test data collected was based on the percent scores given by the application to the following fields:
  - Sender information
  - Message content
  - Links
  - Authentication
  - Total evaluation

The total average percent score for each of the data fields
![](figures/total_evaluation_score.png)

#### Analysis of the application detection test data:

Total evaluation legitimate emails:

![](figures/tot_eva_150_legit_emails.png)

Total evluation phishing emails:

![](figures/tot_eva_150_phishing_emails.png)

Sender information section:

![](figures/sender_section_emails.png)

Message content section:

![](figures/content_section_emails.png)

Links section:

![](figures/links_section_emails.png)

Authetication section:

![](figures/authentication_section_links.png)

## Improvements
Improvement of existing functionality:
- Improve normalization of data gathered from emails (sender's display name and email address)
- Improve analysis of email message content (expand phishing word list)
- Improve percent score system (tuning of the percent scores given to each of the sections)
    
Further work:
- Implement machine learning text classification for email messages. (Tensorflow.js)
- Access email user contact list
- Convert application from client-side to server-side (from Node.js to Azure cloud)
- Implement storage of user data to enable functionality such as:
  - Collect email data for usage in machine learning.
  - User application preferences and customization.
  - Storing user information such as email contact list.

    

## About project

## Abstract

## Tools and frameworks

Following tools and frameworks where used to develop the application.

### Javascript
This template is written using JavaScript. For the [TypeScript](http://www.typescriptlang.org/) version of this template, go to [Office-Addin-TaskPane-React](https://github.com/OfficeDev/Office-Addin-TaskPane-React).

### Yeoman generator
This repository contains the source code used by the [Yo Office generator](https://github.com/OfficeDev/generator-office) when you create a new Office Add-in that appears in the task pane. You can also use this repository as a sample to base your own project from if you choose not to use the generator. 

### Visual Studio Code (IDE)


## Copyright

Copyright (c) 2019 Microsoft Corporation. All rights reserved.
