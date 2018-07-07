var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/userModel');
var bookModel = require.main.require('./models/bookModel');
var validationRules = require.main.require('./validation_rules/rules');
var asyncValidator = require('async-validator-2');

router.get('/home', (req, res)=> {
    res.render('admin/home');
});

router.get('/profile', (req, res)=> {
    var admin = userModel.getUser(req.session.admin, (result)=> {
        if(!result){
            res.send("invalid!");
        }
        else {
            console.log(result);
            res.render('admin/profile', {res: result});
        }
    });
});

router.get('/profile/edit', (req, res)=> {
    var admin = userModel.getUser(req.session.admin, (result)=> {
        if(!result){
            res.send("invalid");
        }
        else {
            console.log(result);
            res.render('admin/profile-edit', {res: result, errs: []});
        }
    });
});

router.post('/profile/edit', (req, res)=> {
    var rules = validationRules.users.update;
    var validator = new asyncValidator(rules);
    var data = {
      user_id: req.body.user_id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      gender: req.body.gender
    };

    validator.validate(data, (errors, fields)=> {
        if(!errors){
            userModel.updateUser(data, (result)=> {
                if(!result){
                    res.send('invalid');
                }
                else {
                    res.redirect('/admin/profile');
                }
            });
        }
        else {
            console.log(fields);
            res.render('admin/profile-edit', {errs: errors, res: []});
        }
    });
});

router.get('/changepass', (req, res)=> {
    var admin = userModel.getUser(req.session.admin, (result)=> {
        if(!result){
            res.send("invalid!");
        }
        else {
            console.log(result);
            res.render('admin/change-password', {res: result, errs: [], success: []});
        }
    });
});

router.post('/changepass', (req, res)=> {
    var rules = validationRules.users.changePassword;
    var validator = new asyncValidator(rules);
    var data = {
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword,
      confirmPassword: req.body.confirmPassword
    };

    if(req.body.password == req.body.oldPassword){
        validator.validate(data, (errors, fields)=> {
            if(!errors){
                if(req.body.newPassword == req.body.confirmPassword){
                    userModel.updatePassword(req.body.newPassword, req.body.user_id, (result)=> {
                        if(!result){
                            res.send('invalid');
                        }
                        else {
                            res.render('admin/change-password', {errs:[], res: [], success: [{message: "Password changed successfully"}]});
                        }
                    });
                }
                else {
                    res.render('admin/change-password', {errs:[{message: "Your new passwords don't match!"}], res: [], success: []});
                }
            }
            else {
                console.log(fields);
                res.render('admin/change-password', {errs: errors, res: [], success: []});
            }
        });
    }
    else {
        res.render('admin/change-password', {errs: [{message: "Your old passsword does not match!"}], res: [], success: []});
    }

});

router.get('/books', (req, res)=> {
    bookModel.getAll((result)=> {
        if(!result){
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render('admin/books', {res: result, errs: []});
        }
    });
});

router.post('/books', (req, res)=> {
    var searchBy = req.body.searchBy;
    var word = req.body.word;
    bookModel.searchBy(searchBy, word, (result)=> {
        if(!result){
            res.render('admin/books', {res: [], errs: [{message: "No results found!"}]});
        }
        else {
            console.log(result);
            res.render('admin/books', {res: result, errs: []})
        }
    });
});

router.get('/customers', (req, res)=> {
    userModel.getAll((result)=> {
        if(!result){
            res.send("Invalid");
        }
        else {
            console.log(result);
            res.render('admin/customers', {res: result, errs: []});
        }
    });
});

router.post('/customers', (req, res)=> {
    var searchBy = req.body.searchBy;
    var word = req.body.word;
    userModel.searchBy(searchBy, word, (result)=> {
        if(!result){
            res.render('admin/customers', {res: [], errs: [{message: "No results found!"}]});
        }
        else {
            console.log(result);
            res.render('admin/customers', {res: result, errs: []})
        }
    });
});

router.get('/customers/add', (req, res)=> {
    res.render('admin/customers-add', {errs: [], success: []});
});

router.post('/customers/add', (req, res)=> {
    var data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        address: req.body.address,
        gender: req.body.gender
    };

    var rules = validationRules.users.create;
    var validator = new asyncValidator(rules);

    validator.validate(data, (errors, fields)=> {
        if(!errors){
            userModel.createUser(data, (result)=> {
                if(!result){
                    res.send("Invalid");
                }
                else {
                    console.log(result);
                    res.render('admin/customers-add', {errs: [], success: [{message: "Customer added successfully!"}]});
                }
            });
        }
        else {
            console.log(fields);
            res.render('admin/customers-add', {errs: errors, success: []});
        }
    });
});

router.get('/books/add', (req, res)=> {
    res.render('admin/books-add', {errs: [], success: []});
});

router.post('/books/add', (req, res)=> {
    var data = {
        genre: req.body.genre,
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        edition: req.body.edition,
        isbn: req.body.isbn,
        pages: req.body.pages
    };

    var rules = validationRules.books.create;
    var validator = new asyncValidator(rules);

    validator.validate(data, (errors, fields)=> {
        if(!errors){
            bookModel.createBook(data, (result)=> {
                if(!result){
                    res.send("Invalid");
                }
                else {
                    console.log(result);
                    res.render('admin/books-add', {errs: [], success: [{message: "Book added successfully!"}]});
                }
            });
        }
        else {
            console.log(fields);
            res.render('admin/books-add', {errs: errors, success: []});
        }
    });
});

router.get('/books/edit/:id', (req, res)=> {
    var book = req.params.id;
    bookModel.getBook(book, (result)=> {
        if(result.length == 0){
            res.send("Invalid");
        }
        else {
            res.render('admin/books-edit', {res: result, errs: [], success: []});
        }
    });
});

router.post('/books/edit/:id', (req, res)=> {
    var data = {
        genre: req.body.genre,
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        edition: req.body.edition,
        isbn: req.body.isbn,
        pages: req.body.pages
    };
    var book_id = req.body.book_id;

    var rules = validationRules.books.create;
    var validator = new asyncValidator(rules);

    validator.validate(data, (errors, fields)=> {
        if(!errors){
            bookModel.updateBook(book_id, data, (result)=> {
                if(!result){
                    res.send("Invalid");
                }
                else {
                    console.log(result);
                    res.render('admin/books-edit', {res: result, errs:[], success: [{message: "Book updated successfully!"}]});
                }
            });
        }
        else {
            console.log(fields);
            res.render('admin/books-edit', {res: data, errs: errors, success: []})
        }
    });

});

router.get('/customers/edit/:id', (req, res)=> {
    var customer = req.params.id;
    userModel.getUser(customer, (result)=> {
        if(result.length == 0){
            res.send("Invalid");
        }
        else {
            res.render('admin/customers-edit', {res: result, errs: [], success: []});
        }
    });
});

router.post('/customers/edit/:id', (req, res)=> {
    var data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        address: req.body.address,
        gender: req.body.gender
    };
    var customer_id = req.body.user_id;

    var rules = validationRules.users.create;
    var validator = new asyncValidator(rules);

    validator.validate(data, (errors, fields)=> {
        if(!errors){
            userModel.updateCustomer(customer_id, data, (result)=> {
                if(!result){
                    res.send("Invalid");
                }
                else {
                    console.log(result);
                    res.render('admin/customers-edit', {res: result, errs:[], success: [{message: "Customer updated successfully!"}]});
                }
            });
        }
        else {
            console.log(fields);
            res.render('admin/customers-edit', {res: data, errs: errors, success: []});
        }
    });

});


module.exports = router;