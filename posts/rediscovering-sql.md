I've spent the past year or so hacking away on a multitude of NodeJS projects. At the heart of a few has been [MongoDB](https://www.mongodb.org/), a pretty capable document orientated database. 

MongoDB fits really well with the programming style of a lot of NodeJS / JavaScript devs, as its essentially a well organised JSON file (or files), that integrates well with your existing objects on the the server side e.g. the content of an `application/json` *POST* request.

This is all fine and dandy until you start deciding to use Mongo as a relational database. Mongo **ISN'T** a relational database, and as such doesn't have things like foreign keys. This means that you basically have to write your own relations and spend ages writing *fluff* to deal with all the use cases.

> I had kidded myself into thinking that Mongo was just a JSON friendly relational database.

It took building a project using Mongo and having to write everything from scratch for me to realise how blind I'd been. I had kidded myself into thinking that Mongo was just a JSON friendly relational database. At this point I all but abandoned the project, pushing the idea aside for another day.

Upon starting my next project, I decided to actually assess which database type would be best for the project and, unsurprisingly, a relational database ticked all the boxes. I'd used MySQL in the past when I first learnt SQL and database structure and management, but I decided to go with a name that I'd heard thrown around the office: PostgreSQL. I had done some reading on it and it looked like it performed well in production environments, as well as providing lots of extensibility. I fired up a VM and got to work installing and configuring it. Once I was sat there on a *psql* command line I started trying out what I could remember of SQL: `CREATE TABLE Test;`, `DROP TABLE Test;`. It soon started to come back to me, and once I'd got some tables set up and started actually designing the schema I quickly realised what I'd missed. 

So the moral of the story is: use the tool that does the job the best, not the one that's the easiest to use/integrate!
