# Knowledge Article: Experience and Agile Handoffs
Setting up a Node app is often the first real step a student takes into becomming a full-stack developer. In this article I describe my experience building my first Node app along and the problems I encountered, including why Agile handoffs are important in full-stack development.
## My Personal Experience
When it comes to building any Node application, the first step is to install and configure node on your repository. This is as easy as copy-pasting a few commands from online into your terminal. I already had some code I was going to reuse from another project, so I ran the command `npm run start`, which in previous experience immediately ran the program. However, I encountered an error. Node was telling me that "start" was undefined and it did not find it in any of the node packages.



<!-- Forgot to npm init -y
Had to write "start": "node app.mjs" to scripts in package.json
Keep getting "TypeError: Cannot read preperties of undefined (reading 'startsWith')"
Actually just an error connecting to mongo, improper variable name for env URI -->