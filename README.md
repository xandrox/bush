A node.js based BUildSHell
==========================

Use the BUildSHell to trigger builds und script your development tasks.
Extend ist with maven or ant support.
Operate von Maven or Ant with the bush JavaScript Model und get code completion thanks nodejs.

    const sampleProject = new bush.Module("sample");

    sampleProject.install(); //mvn install

    sampleProject.install({skiptTests:true}); //mvn install -DskipTests=true


    sampleProject.goals.eclipse.clean();
    sampleProject.goals.eclipse.eclipse({downloadSources:true}); //mvn eclipse:eclipse -DdownloadSources=true

    sampleProject.goals.eclipse.eclipse.help();

Write your own Plugins or simple extend Projects with shortcut functions.

    sampleProject.buildAndDeploy = function() {
        this.install();
        this.goals["jboss-as"].deploy();
    };


*Status*: in development

