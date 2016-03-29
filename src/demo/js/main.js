/**
 * Created by User on 20.02.2016
 */

$(document).ready(function () {

    // Themes

    var $styleFlowDesigner = $("#style-fd");
    var $styleAdminConsole = $("#style-ac").prop("disabled", true);
    var $styleMonitoringConsole = $("#style-mc").prop("disabled", true);

    var $styles = $styleFlowDesigner.add($styleAdminConsole);
    $styles = $styles.add($styleMonitoringConsole);

    var $buttonFlowDesigner = $(".js-switch-fd");
    var $buttonAdminConsole = $(".js-switch-ac");
    var $buttonMonitoringConsole = $(".js-switch-mc");

    $buttonFlowDesigner.click(function (e) {
        e.stopPropagation();
        $styles.prop("disabled", true);
        $styleFlowDesigner.prop("disabled", false);
        $(".theme-menu").find(".active").removeClass("active");
        $buttonFlowDesigner.addClass("active");
    });

    $buttonAdminConsole.click(function (e) {
        e.stopPropagation();
        $styles.prop("disabled", true);
        $styleAdminConsole.prop("disabled", false);
        $(".theme-menu").find(".active").removeClass("active");
        $buttonAdminConsole.addClass("active");
    });

    $buttonMonitoringConsole.click(function (e) {
        e.stopPropagation();
        $styles.prop("disabled", true);
        $styleMonitoringConsole.prop("disabled", false);
        $(".theme-menu").find(".active").removeClass("active");
        $buttonMonitoringConsole.addClass("active");
    });


    // Examples

    $(".js-show-code").click(function (e) {
        e.stopPropagation();
        var $target = $(e.target);
        $target.closest(".js-show-code").find("span.fa")
            .toggleClass("fa-chevron-circle-down")
            .toggleClass("fa-chevron-circle-up");

        var $code = $target.closest(".example").find(".code");
        $code.toggle();
        setTimeout(function () {
            $code.data("editor").refresh();
        }, 0);
    });

    var examples = [];

    examples.push($("#example-inputs"));

    var $exampleTabs = $("#example-tabs");
    $exampleTabs.find("li").click(function (e) {
        e.stopPropagation();
        var $target = $(e.target);
        $target.closest(".deb-tabs").find(".active").removeClass("active");
        $target.closest("li").addClass("active");
    });

    examples.push($exampleTabs);
    
    var $exampleTabsUnderscore = $("#example-tabs-underscore");
    $exampleTabsUnderscore.find("li").click(function (e) {
        e.stopPropagation();
        var $target = $(e.target);
        $target.closest(".deb-tabs").find(".active").removeClass("active");
        $target.closest("li").addClass("active");
    });

    examples.push($exampleTabsUnderscore);

    var $exampleVerticalNav = $("#example-vertical-nav");
    $exampleVerticalNav.find(".deb-items").find("li").click(function (e) {
        e.stopPropagation();
        var $target = $(e.target);
        $target.closest(".deb-items").find(".active").removeClass("active");
        $target.closest("li").addClass("active");
    });

    examples.push($exampleVerticalNav);

    var $exampleCardFile = $("#example-cardfile");
    $exampleCardFile.find(".panel-heading").click(function (e) {
        e.stopPropagation();
        var $panel = $(e.target).closest(".panel");
        $panel.toggleClass("collapsed");
        $panel.find(".toggleable-part").slideToggle(350);
    });

    examples.push($exampleCardFile);
    
    examples.push($("#example-links"));
    examples.push($("#example-buttons"));

    var $examplePagination = $("#example-pagination");

    (function () {
        var pageCount = 5;

        var $navigation = $examplePagination.find(".nav-controls");
        var $paginationPageSelect = $navigation.find("select");

        for (var i = 1; i <= pageCount; i++) {
            $paginationPageSelect.append($("<option></option>").attr("value", i).text(i));
        }

        $paginationPageSelect.val(1);

        $navigation.find("[title='First page']").click(function (e) {
            e.stopPropagation();
            $paginationPageSelect.val(1);
        });

        $navigation.find("[title='Previous page']").click(function (e) {
            e.stopPropagation();
            var p = $paginationPageSelect.val();
            if (p > 1) {
                $paginationPageSelect.val(--p);
            }
        });

        $navigation.find("[title='Next page']").click(function (e) {
            e.stopPropagation();
            var p = $paginationPageSelect.val();
            if (p < pageCount) {
                $paginationPageSelect.val(++p);
            }
        });

        $navigation.find("[title='Last page']").click(function (e) {
            e.stopPropagation();
            $paginationPageSelect.val(pageCount);
        });
    })();

    examples.push($examplePagination);

    examples.push($("#example-pict-buttons"));
    examples.push($("#example-popup"));
    examples.push($("#example-login"));

    $.each(examples, function (index, $example) {
        var $code = $example.find(".code");
        var editor = CodeMirror($code[0], {
            value: formatCode($example.find(".content")),
            mode: "htmlmixed",
            lineNumbers: true,
            readOnly: true
        });
        $code.data("editor", editor);
    });
});

var formatCode = function ($el) {
    return vkbeautify.xml($el.html().trim());
};
