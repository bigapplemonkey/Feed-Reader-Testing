/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed in the allFeeds
         * object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are defined', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(typeof feed.url).toBe('string');
                expect(feed.url).not.toBe('');
                //https://www.regextester.com/20
                expect(feed.url).toMatch(/^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/);
            }
        });

        /* Loops through each feed in the allFeeds
         * object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(typeof feed.name).toBe('string');
                expect(feed.name).not.toBe('');
            }
        });
    });


    /* Test suite for "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        const $body = document.body;
        const $icon = document.querySelector('.menu-icon-link');

        it('is hidden by default', function() {
            expect($body.classList.contains('menu-hidden')).toBe(true);
        });

        /* Ensures the menu changes visibility
         * when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when the menu icon is clicked', function() {
            $icon.click();
            expect($body.classList.contains('menu-hidden')).toBe(false);
            $icon.click();
            expect($body.classList.contains('menu-hidden')).toBe(true);
        });

    });

    /* Test suite for "Initial Entries" */
    describe('Initial Entries', function() {
        /* Ensures when the loadFeed function is
         * called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('there is at least a single feed', function(done) {
            const $feeds = document.querySelector('.feed');
            const feedCount = $feeds.getElementsByClassName('entry').length;
            expect(feedCount > 0).toBe(true);
            done();
        });
    });


    /* Test suit for "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* Ensures when a new feed is loaded by the
         * loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        const $feeds = document.querySelector('.feed');
        let feedHTML1, feedHTML2, feedHTML3;

        beforeEach(function(done) {
            loadFeed(0, function() {
                feedHTML1 = $feeds.innerHTML;
                loadFeed(1, function() {
                    feedHTML2 = $feeds.innerHTML;
                    loadFeed(2, function() {
                        feedHTML3 = $feeds.innerHTML;
                        done();
                    });
                });
            });
        });

        it('changes feed content', function(done) {
            expect(feedHTML1).not.toBe(feedHTML2);
            expect(feedHTML2).not.toBe(feedHTML3);
            expect(feedHTML3).not.toBe(feedHTML1);
            done();
        });
    });


}());