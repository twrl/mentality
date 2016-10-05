define(['lodash', 'q', 'zepto', 'core/Messages.js'], function (_, Q, $, $$) {

    function RootView(Application) {

        this.application = Application;

        this.application.setComponent("io.github.twrl.mentality.core.RootView", this);

        Q.all([
            this.application.getComponent("io.github.twrl.mentality.core.Dispatcher").then(_.bind(component => this.dispatcher = component, this)),
            this.application.getComponent("io.github.twrl.mentality.core.LocationStore").then(_.bind(component => this.locationStore = component, this)).then(_.bind(() =>
            this.locationStore.on("change:location", _.bind(this.onlocationchange, this)), this))
        ]).then(_.bind(function () {
            this.application.ready();

        }, this));



    }
    _.extend(RootView.prototype, {
        onlocationchange: function (location, TargetView, Parameters) {
            this.activepage_.removeClass("active-page");

            this.activeView.deactivateView();

            this.application.getComponent(TargetView).then(_.bind(function (component) {

                this.activeView = component;

                var $page = $("<div class='page'></div>")

                var $navbar = $('<div class="navbar-fixed"><nav class="green"><div class="nav-wrapper"><a href="#!/" class="brand-logo left">Mentality</a><ul class="right"></ul></div></nav></div>');
                var $tools = $navbar.find("ul.right");
                $page.prepend($navbar);
                var $container = $("<div class='container'></div>").appendTo($page);
                var vx = this.activeView.render($container, Parameters);

                this.activeView.activateView();
                if (_.has(vx, "toolbar")) {
                    _.forEach(vx.toolbar, _.bind(function (tool) {
                        var $tool = $("<li><a><i class='fa " + tool.icon + "'></i></a></li>");
                        $tool.on("click", _.bind(function () {
                            if (!!tool.target_service) $$(tool.target_service, tool.target_action).set(tool.params).send(this.dispatcher);
                            if (!!tool.return_to) {
                                $$("io.github.twrl.mentality.core.location", "io.github.twrl.mentality.core.location.pushstate")
                                    .set("location", tool.return_to)
                                    .set("title", "")
                                    .set("state", {})
                                    .send(this.dispatcher);
                            }
                        }, this));
                        $tools.append($tool);
                    }, this))
                }

                $page.appendTo(this.$body);

                var old = this.activepage_;
                _.delay(() => old.remove(), 1000);
                _.delay(() => $page.addClass("active-page"), 100);
                this.activepage_ = $page;
                }, this));
        },
        render: function () {
            this.$body = $('<body/>').addClass("green lighten-5");
            this.application.getComponent("io.github.twrl.mentality.dash.DashView").then(_.bind(function (component) {
                this.activeView = component;
                this.activeView.activateView();
                var $page = $("<div class='page'></div>")
                $page.prepend('<div class="navbar-fixed"><nav class="green"><div class="nav-wrapper"><a href="#!/" class="brand-logo left">Mentality</a><ul class="right"><li><a href="#"><i class="fa fa-cog"></i></a></li></ul></div></nav></div>');
                var $container = $("<div class='container'></div>").appendTo($page);
                component.render($container);
                $page.appendTo(this.$body).addClass("active-page");
                this.activepage_ = $page;
                }, this));
            $('body').replaceWith(this.$body);
        }
    });
    return RootView;

});
