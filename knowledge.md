# Knowledge Article: Experience and Agile Handoffs
Setting up a Node app is often the first real step a student takes into becomming a full-stack developer. In this article I describe my experience building my first Node app along and the problems I encountered, including why Agile handoffs are important in full-stack development.
## My Personal Experience
When it comes to building any Node application, the first step is to install and configure node on your repository. This is as easy as copy-pasting a few commands from online into your terminal. I already had some code I was going to reuse from another project, so I ran the command `npm run start`, which in previous experience immediately ran the program. However, I encountered an error. Node was telling me that "start" was undefined and it did not find it in any of the node packages. I didn't work on fixing the issue immediately because I was hungry and the cafeteria I went to school at was about to close, so being the organized college student I was (and am) I left a comment in the code to <mark>handoff my work to a future, satiated me</mark>. After my meal, I quickly returned to work and fixed the issue, a missing alias in a node package.

## Agile Handoffs
What exactly is a handoff in Agile? Why should I care about Agile handoffs? These are questions you might have if you are just getting into full-stack development. 


<!-- Forgot to npm init -y
Had to write "start": "node app.mjs" to scripts in package.json
Keep getting "TypeError: Cannot read preperties of undefined (reading 'startsWith')"
Actually just an error connecting to mongo, improper variable name for env URI -->