var config = {
    cachet_api_url: "http://status.carpenoctem.co/api/v1/",
}

function refresh() {
    getComponentsGroups(updateUI);
}

function getComponentsGroups(callback) {
    var url = config.cachet_api_url + "components/groups";
    var onSuccess = function(response) {
        console.log(response);
        if(response.data)
            callback(response.data);
    }
    var ajaxOptions = {
        url: url,
        success: onSuccess
    };

    $.ajax(ajaxOptions);
}

function updateUI(groups) {
    // Create rendering objects
    // var mustacheData = { groups: [
    //     {   id: 1,
    //         name: "group1",
    //         components: [
    //             {   name: "component1",
    //                 status: "operating"
    //             }]
    //     }]
    // }

    var mustacheData = parseComponentGroups(groups);

    console.log(mustacheData);

    var groupTemplate = $("#cachet-group-template").html();
    var componentTemplate = $("#cachet-component-template").html();
    var partials = {component: componentTemplate};
    var content = Mustache.render(groupTemplate, mustacheData, partials);

    $("#status-groups").html(content);
}

function parseComponentGroups(groups) {
    var groupsData = {};
    var groupsList = [];
    var j = 0;

    console.log(groups.length + " groups to parse");

    for(var i = 0; i < groups.length; i++) {
        if(groupHasComponents(groups[i])) {
            console.log("Parsing " + i + " group");
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
