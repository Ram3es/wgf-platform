# WitGritFit

Status of last deployment:<br>
<img src="https://github.com/WITGRITFIT/wgf-platform/workflows/Deploy-to-Amazon-ESC/badge.svg?branch=main"><br>
1. [General](#general)
2. [Tech stack](#tech-stack)
3. [Running applications locally](#running-applications-locally)
4. [Git Flow](#git-flow)
5. [Server](#server)
6. [Sentry](#sentry)

## General

**Project name:** Wit Grit Fit Platform.

**Project goal:** to help students figure out what skills they need to be successful in different work sectors.

At Avid Adventures, we are all about helping students and working professionals navigate the rapidly changing and increasingly complex world of jobs.

Career ladders are disappearing quickly, replaced by jungle gyms that require skill and a deep understanding of personal skills and motivations to advance in.

We work with **schools, companies and non-profits** to help their students and stakeholders learn more the 21st century jobs scene, and gain motivation to upskill themselves. We have also run **volunteer programmes** for companies wanting to make an impact with the skills message.

## Tech stack:

- Typescript
- Client: React, redux-toolkit, redux-thunk, styled-components
- [AWS](https://aws.amazon.com/): Lambda, SSL Certificate, Amazon Simple Email Service, Auto Scaling, Load Balancing
- Api: Nest.js, nestjs/passport, swagger

## Running applications locally

### Required local files (.env)

web/.env
api/.env

For the successful run of the project applications and their further correct functioning, it is necessary to insert the above files.

### Initial setup (ideally done once)
    npm install
### Starting

**web**: 
```bash
$ npm run start
```
**api**: 
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
### Git Flow
### To deploy changes to production from local development:

1. Be in the local branch. Execute `git pull` if necessary;
2. Create a new branch f via `git checkout -b`.;
3. `git fetch && git reset origin/master`, if conflicts arise, resolve;
4. `git commit -m "{branch name}"`;
5. `git push`;
6. Create PR from new branch to **main**;
7. execute **Rebase and merge** from the PR.

GitHub Actions will run building and deploying the modified applications to the corresponding hosting sites of the AWS project.

### Hosted links:

| Environment | App   | Link                                  |
| ----------- | ----- | ------------------------------------- |
| production  | witgritfit-platform | https://witgritfit-platform.com        |
| production  | apiwitgritfit-platform | https://apiplatform.witgritfit.com      |

## Server

The **server** based Node Js (Nest.js framework).

The **server** address locally is http://localhost:8080. The port can be changed in the server's .env file if you really want to.

Also there is api documentation from Swagger at this link https://apiplatform.witgritfit.com/docs

## Sentry

The project uses [Sentry](https://sentry.io/) for the **app** and **admin** applications.
The credentials for the sentry.io account (email and password from the Google account) must be obtained from the client.

In general, everything is quite simple there and information can be easily found, therefore details on using Sentry are not provided in this documentation.

![API DEPLOY](https://github.com/jacphua/wgf-platform/actions/workflows/api-deploy.yml/badge.svg)
![CLIENT DEPLOY](https://github.com/jacphua/wgf-platform/actions/workflows/client-deploy.yml/badge.svg)
