var config = {
    cachet_api_url: "http://status.carpenoctem.co/api/v1/",
}

function refresh() {
    getComponentsGroups(updateUI);
}

function getComponentsGroups(callback) {
    var url = config.cachet_api_url + "components/groups";
    var onSuccess = function(response) {
        if(response.data)
            callback(response.data);
    }
    var ajaxOptions = {
        url: url,
        success: onSuccess,
        error: displayError
    };

    $.ajax(ajaxOptions);
}

function updateUI(groups) {

    var mustacheData = parseComponentGroups(groups);

    var groupTemplate = $("#cachet-group-template").html();
    var componentTemplate = $("#cachet-component-template").html();
    var partials = {component: componentTemplate};
    var content = Mustache.render(groupTemplate, mustacheData, partials);

    $("#status-content").html(content);
}

function displayError(error) {
    var errorTemplate = $("#cachet-error").html();
    var errorContent = Mustache.render(errorTemplate, {});

    $("#status-content").html(errorContent);
}

function parseComponentGroups(groups) {
    var groupsData = {};
    var groupsList = [];
    var j = 0;

    for(var i = 0; i < groups.length; i++) {
        if(groupHasComponents(groups[i])) {
            groupsList[j] = parseSingleGroup(groups[i]);
            j++;
        }
    }

    groupsData.groups = groupsList;

    return groupsData;
}

function parseSingleGroup(group) {
    var groupData = {};
    var groupComponents = [];

    groupData.id = group.id;
    groupData.name = group.name;

    for(var i = 0; i < group.enabled_components.length; i++) {
        groupComponents[i] = parseSingleComponent(group.enabled_components[i]);
    }

    groupData.components = groupComponents;

    return groupData;
}

function parseSingleComponent(component) {
    var componentData = {};

    componentData.id = component.id;
    componentData.name = component.name;
    componentData.description = component.description;
    componentData.link = component.link;
    componentData.status = component.status;
    componentData.enabled = component.enabled;
    componentData.statusName = component.status_name;

    return componentData;
}

function groupHasComponents(group) {
    return (group.enabled_components.length > 0);
}

$(function() {
    refresh();
});
