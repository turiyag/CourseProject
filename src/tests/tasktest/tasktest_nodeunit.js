var fs = require('fs');
var task = require('task').task;

/*
 * Tests for task using NodeUnit
 *
 * TODO: Provide tests for task estimation.
 *
 * Usage:
 *
 * To run this test specifically, within the tests/ directory, use:
 *     node ./nodeunit/bin/nodeunit tasktest/tasktest_nodeunit.js 
 *         - or -
 *     cd tasktest/
 *     ./tasktest_nodeunit.sh
 */


exports.TaskTests = {
    "Test 1: Tasks can be created and modified": function(test) {
        test.expect(3);
        
        var testTask;
        
        test.doesNotThrow(function() {
            testTask = new task("name", "", 0, 0, "Low", "", "Open", "test@test.com");
        });
        
        test.doesNotThrow(function() {
            testTask.modifyTask("A name", "A description", 1, 1, "Low", "Progress message", "Open", "test@test.com");
        });
        
        test.ok(testTask instanceof task);
        
        test.done();
    },

    "Test 2: Task Name can only be a String/Number": function(test) {
        test.expect(8);
        
        var nameTask = new task("name", "", 0, 0, "Low", "", "Open", "test@test.com");
        var invalidInput = ["", new Object(), null, undefined];
        var validInput = ["A String name", 3];
        
        for (var i = 0 ; i < invalidInput.length ; i++) {
            test.throws(function() {
                nameTask.setTaskName(invalidInput[i]);
            });
        }
        
        for (var j = 0 ; j < validInput.length ; j++) {
            test.doesNotThrow(function() {
                nameTask.setTaskName(validInput[j]);
            });
            test.equal(nameTask.getTaskName(), validInput[j]);
        }
        
        test.done();
    },

    "Test 3: Task Description can only be an Empty String/String/Number": function(test) {
        test.expect(9);
        
        var descriptTask = new task("name", "", 0, 0, "Low", "", "Open", "test@test.com");
        var invalidInputs = [new Object(), null, undefined];
        var validInputs = ["", 'A String Description', 1];
        
        for (var i = 0 ; i < invalidInputs.length ; i++) {
            test.throws(function() {
                descriptTask.setDescription(invalidInputs[i]);
            });
        }
        
        for (var i = 0 ; i < validInputs.length ; i++) {
                test.doesNotThrow(function() {
                    descriptTask.setDescription(validInputs[i]);
                });
                test.equal(descriptTask.getDescription(), validInputs[i]);
        }
        
        test.done();
    },

    "Test 4: Task Time Spent can only be a Positive Number": function(test) {
        test.expect(15);
        
        var timeSpentTask = new task("name", "", 0, 0, "Low", "", "Open", "test@test.com");
        var invalidInputs = ["", 'A String Time Spent', -1, -59, new Object(), null, undefined];
        var validInputs = [0, 7, 99, 3.14];
        
        for (var i = 0 ; i < invalidInputs.length ; i++) {
            test.throws(function() {
                timeSpentTask.setTimeSpent(invalidInputs[i]);
            });
        }
        
        for (var i = 0 ; i < validInputs.length ; i++) {
                test.doesNotThrow(function() {
                    timeSpentTask.setTimeSpent(validInputs[i]);
                });
                test.equal(timeSpentTask.getTimeSpent(), validInputs[i]);
        }
        
        test.done();
    },
    
    "Test 5: Task Time Left can only be a Positive Number": function(test) {
        test.expect(15);
        
        var timeLeftTask = new task("name", "", 0, 0, "Low", "", "Open", "test@test.com");
        var invalidInputs = ["", 'A String Time Left', -14, -900, new Object(), null, undefined];
        var validInputs = [0, 66, 777, 3.14];
        
        for (var i = 0 ; i < invalidInputs.length ; i++) {
            test.throws(function() {
                timeLeftTask.setTimeLeft(invalidInputs[i]);
            });
        }
        
        for (var i = 0 ; i < validInputs.length ; i++) {
                test.doesNotThrow(function() {
                    timeLeftTask.setTimeLeft(validInputs[i]);
                });
                test.equal(timeLeftTask.getTimeLeft(), validInputs[i]);
        }
        
        test.done();
    },
    
    "Test 6: Task Priority must be a valid String (Low, Medium, High)": function(test) {
        test.expect(15);

        var priorityTask = new task("name", "", 0, 0, "Low", "", "Open", "test@test.com");
        var invalidInputs = ["", "Not a valid Priority", "low", "medium", "high", 4, new Object(), null, undefined];
        var validInputs = ["Low", "Medium", "High"];
        
        for (var i = 0 ; i < invalidInputs.length ; i++) {
            test.throws(function() {
                priorityTask.setPriority(invalidInputs[i]);
            });
        }
        
        for (var j = 0 ; j < validInputs.length ; j++) {
            test.doesNotThrow(function() {
                priorityTask.setPriority(validInputs[j]);
            });
            test.equals(priorityTask.getPriority(), validInputs[j]);
        }
        
        test.done();
    },

    "Test 7: Task Progress can only be an Empty String/String/Number": function(test) {
        test.expect(9);

        var progressTask = new task("name", "", 0, 0, "Low", "", "Open", "test@test.com");
        var invalidInputs = [new Object(), null, undefined];
        var validInputs = ["", "This is a valid Progress message", 1];
        
        for (var i = 0 ; i < invalidInputs.length ; i++) {
            test.throws(function() {
                progressTask.setProgress(invalidInputs[i]);
            });
        }
        
        for (var j = 0 ; j < validInputs.length ; j++) {
            test.doesNotThrow(function() {
                progressTask.setProgress(validInputs[j]);
            });
            test.equals(progressTask.getProgress(), validInputs[j]);
        }
        
        test.done();
    },

    "Test 8: Task Status must be a valid String (Open or Closed)": function(test) {
        test.expect(12);

        var statusTask = new task("name", "", 0, 0, "Low", "", "Open", "test@test.com");
        var invalidInputs = ["", "This is not a valid Status", "open", "closed", 5, new Object(), null, undefined];
        var validInputs = ["Open", "Closed"];
        
        for (var i = 0 ; i < invalidInputs.length ; i++) {
            test.throws(function() {
                statusTask.setStatus(invalidInputs[i]);
            });
        }
        
        for (var j = 0 ; j < validInputs.length ; j++) {
            test.doesNotThrow(function() {
                statusTask.setStatus(validInputs[j]);
            });
            test.equals(statusTask.getStatus(), validInputs[j]);
        }
        
        test.done();
    },

    //TODO: This test should check if the user is a valid email address (as String type).
    "Test 9: User can only be a non-empty String": function(test) {
        test.expect(7);
        
        var userTask;
        var invalidInputs = ["", 4, new Object(), null, undefined];
        var validInputs = ["test@test.com"];
        
        for (var i = 0 ; i < invalidInputs.length ; i++) {
            test.throws(function() {
                userTask = new task("name", "", 0, 0, "Low", "", "Open", invalidInputs[i]);
            });
        }
        
        for (var j = 0 ; j < validInputs.length ; j++) {
            test.doesNotThrow(function() {
                userTask = new task("name", "", 0, 0, "Low", "", "Open", validInputs[j]);
            });
            test.equals(userTask.getUser(), validInputs[j]);
        }
        
        test.done();
    },
};
