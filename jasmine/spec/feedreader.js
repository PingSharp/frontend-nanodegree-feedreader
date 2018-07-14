/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each feed has a Url defined and the URL is not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each feed has a name defined and the name is not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function () {
        let body = document.querySelector('body');
        let classArray = [];
        let spyEvent = spyOnEvent('.menu-icon-link', 'click');

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function () {
            expect(body.className).toBe('menu-hidden');
            /* Get all children and later check if there is a slide menu
            * This is better than select via index (e.g. body.childNodes[0]) since we do not care the order
            * */
            body.childNodes.forEach(function (child) {
                if (child.className !== '' && child.className !== undefined) {
                    classArray.push(child.className);
                }
            })

            expect(classArray.includes('slide-menu')).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('display when clicked and hide when clicked again', function () {
            /* Use JQuery to find element and execute the click method
             * After check if the className changed (from menu-hidden to '')
             * */
            $('.menu-icon-link').click();
            expect('click').toHaveBeenTriggeredOn('.menu-icon-link');
            expect(spyEvent).toHaveBeenTriggered();
            expect(body.className).toBe('');
            /* Use JQuery to find element and execute the click method
             * After check if the className changed back (from '' back to menu-hidden)
             * */
            $('.menu-icon-link').click();
            expect('click').toHaveBeenTriggeredOn('.menu-icon-link');
            expect(spyEvent).toHaveBeenTriggered();
            expect(body.className).toBe('menu-hidden');
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        let container = document.querySelector(".feed");
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('should not be empty', function (done) {
            expect(container.childElementCount).not.toBe(0);
            done();
        });

    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        let entryLinkBefore;
        let entryLinkAfter;
        beforeAll(function (done) {
            loadFeed(1, function () {
                entryLinkBefore = document.querySelector(".entry-link");
                done();
            });
        });
        beforeEach(function (done) {
            loadFeed(0, function () {
                entryLinkAfter = document.querySelector(".entry-link");
                done();
            });
        });

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('is Loaded', function (done) {
            expect(entryLinkAfter.href).not.toBe(entryLinkBefore.href);
            done();

        })
    });
}());
