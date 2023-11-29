// GET log Variables
try {
    var startTimeStamp = context.getVariable("log.startTimeStamp");
    var apiName = context.getVariable("operation");
    var proxyRevision = context.getVariable("log.proxyRevision");
    var apigeeProxyName = context.getVariable("log.proxyName");
    var proxyEndpointName = context.getVariable("log.proxyEndpointName");
    var proxyVerb = context.getVariable("log.proxyVerb");
    var proxyScheme = context.getVariable("log.proxyScheme");
    var proxyHost = "apigee-acme";
    var proxyURI = context.getVariable("log.proxyURI");
    var proxyRequest = context.getVariable("private.log.proxyRequest");
    var proxyStartTimeStamp = context.getVariable("log.proxyStartTimeStamp");
    var proxyEndTimeStamp = context.getVariable("log.proxyEndTimeStamp");
    var clientIP = context.getVariable("log.clientIP");
    var clientPort = context.getVariable("log.clientPort");
    var logTargetRequestVerb = context.getVariable("log.targetVerb");
    var targetURI = context.getVariable("log.targetURI");
    var requestURI = context.getVariable("log.requestURI");
    var targetRequest = context.getVariable("log.targetRequest");
    var routeName = context.getVariable("log.routeName");
    var routeTargetName = context.getVariable("log.routeTargetName");
    var targetName = context.getVariable("log.TargetName");
    var targetReqStartTimeStamp = context.getVariable("log.targetReqStartTimeStamp");
    var targetReqEndTimeStamp = context.getVariable("log.targetReqEndTimeStamp");
    var targetResponse = context.getVariable("log.targetResponse");
    var targetResponsePhrase = context.getVariable("log.targetResponsePhrase");
    var targetResStartTimeStamp = context.getVariable("log.targetResStartTimeStamp");
    var targetResEndTimeStamp = context.getVariable("log.targetResEndTimeStamp");
    var clientHost = context.getVariable("log.clientHost");
    var targetResponseCode = context.getVariable("log.targetResponseCode");
    var proxyResponseStatusCode = context.getVariable("response.status.code");
    var proxyResponseReasonPhrase = context.getVariable("response.reason.phrase");
    var targetHeaderNames = context.getVariable("log.targetHeaderNames");
    var targetResponseHeaderNames = context.getVariable("log.targetResponseHeaderNames");
    var contentType = context.getVariable("log.Content-Type");
    var accept = context.getVariable("log.Accept");
    var environmentName = context.getVariable("log.environmentName");
    var organizationName = context.getVariable("log.organizationName");
    var isError = context.getVariable("log.isError");
    var targetScheme = context.getVariable("log.targetScheme");
    var targetHost = context.getVariable("log.targetHost");
    var targetPort = context.getVariable("log.targetPort");
    var errorStatusCode = context.getVariable("flow.api.error.status");
    var errorReasonPhrase = context.getVariable("flow.api.error.reason");
    var isErrorLog = context.getVariable("isErrorLog");
    var isTargetExecuted = context.getVariable("log.isTargetExecuted");
    var logEverything = context.getVariable("metadata.log.everything");
    var reqContentLength = context.getVariable("request.header.Content-Length");
    var resContentLength = context.getVariable("response.header.Content-Length");
    var requestHeaderCount = context.getVariable("proxyHeaderCount");
    var targetRequestHeaderCount = context.getVariable("targetHeaderCount");
    var responseHeaderCount = context.getVariable("response.headers.count");
    var messageCorrId = context.getVariable("messageCorrId");
    var logRequestHeaders = context.getVariable("logRequestHeaders");
    var reqHeaders = context.getVariable("reqHeaders");

    var cacheHit = 'false';

    // Tracing
    var targetReqStartTimeStamp = context.getVariable("target.sent.end.timestamp");
    var targetReqEndTimeStamp = context.getVariable("target.received.start.timestamp");

    
    /** Handle Proxy Response Headers for logging **/
    var reqProxyheaderFieldsCollection = context.getVariable('request.headers.names') + '';
    reqProxyheaderFieldsCollection = reqProxyheaderFieldsCollection.substr(1, reqProxyheaderFieldsCollection.length - 2);
    var reqProxyheadersArray = reqProxyheaderFieldsCollection.split(", ");
    if (reqProxyheadersArray.length > 0) {
        var logProxyRequestHeaders = '{';
        for (var i = 0; i < reqProxyheadersArray.length; i++) {
            if (reqProxyheadersArray[i].toLowerCase() !== 'authorization') {
                if (i !== 0)
                    logProxyRequestHeaders = logProxyRequestHeaders + ',';
                logProxyRequestHeaders = logProxyRequestHeaders + '"' + reqProxyheadersArray[i] + '":"' + context.getVariable('request.header.' + reqProxyheadersArray[i]) + '"';
            }
        }
    
        logProxyRequestHeaders = logProxyRequestHeaders + ',"' + 'request-timestamp' + '":"' + targetReqStartTimeStamp + '"';
        logProxyRequestHeaders = logProxyRequestHeaders + ',"' + 'response-timestamp' + '":"' + targetReqEndTimeStamp + '"';
        logProxyRequestHeaders = logProxyRequestHeaders + ',"' + 'gateway-type' + '":"' + 'APIGEE' + '"';
            
        logProxyRequestHeaders = logProxyRequestHeaders + "}";
        context.setVariable("logProxyRequestStr", logProxyRequestHeaders);
        var reqHeaders = JSON.parse(logProxyRequestHeaders);
        context.setVariable("logProxyResponseHeaders", reqHeaders);
        context.setVariable("logProxyRequestPayload1", proxyRequest);
    }

    var queryParams = context.getVariable("request.queryparams.names") + '';
    context.setVariable("queryParams", queryParams);
    queryParams = queryParams.substr(1, queryParams.length - 2);

    var queryParamsArray = queryParams.split(", ");
    context.setVariable("queryParamsArray", queryParamsArray.length);
    if (queryParamsArray.length > 0) {
        var logRequestQueryParams = '{';
        for (var i = 0; i < queryParamsArray.length; i++) {
            if (context.getVariable('request.queryparam.' + queryParamsArray[i]) !== null) {
                if (i !== 0)
                    logRequestQueryParams = logRequestQueryParams + ',';
                logRequestQueryParams = logRequestQueryParams + '"' + queryParamsArray[i] + '":"' + context.getVariable('request.queryparam.' + queryParamsArray[i]) + '"';
            }

        }
        logRequestQueryParams = logRequestQueryParams + "}";

        context.setVariable("logRequestQueryParams", logRequestQueryParams);
        var queryParmObj = JSON.parse(logRequestQueryParams);
    }

    // var formParams = context.getVariable("request.formparams.names") + '';
    // context.setVariable("formParams", formParams);
    // formParams = formParams.substring(1, formParams.length - 2);
    // var formParamsArray = formParams.split(", ");
    // context.setVariable("formParamsArray", formParamsArray);
    // if (formParamsArray.length > 0) {
    //     var logRequestFormParams = '{';
    //     for (var i = 0; i < formParamsArray.length; i++) {
    //         if (context.getVariable('request.formparam.' + formParamsArray[i] !== null)) {
    //             if (i !== 0) logRequestFormParams = logRequestFormParams + ',';
    //             logRequestFormParams = logRequestFormParamsc + '"' + formParamsArray[i] + '":"' + context.getVariable('request.formparam.' + formParamsArray[i]) + '"';
    //         }
    //     }
    //     logRequestFormParams = logRequestFormParams + "}";
    //     context.setVariable("logRequestFormParams", logRequestFormParams);
    //     var formParamObj = JSON.parse(logRequestFormParams);
    // }
    
    // var namesString = context.getVariable("request.formparams.names")+'';
    // var names = namesString.slice(1,-1).split(',');
    // context.setVariable("testtesttest", namesString);
    // // var responseTxt = ''
    // // names.forEach(function(name) {
    // //   name = name.trim();
    // //   var thisParam = 'formparam['+ name+']=' +
    // //     context.getVariable("request.formparam." + name);
    // //   print(thisParam);
    // //   responseTxt += thisParam + '\n';
    // // });
    // // context.setVariable('response.content', responseTxt);
    // // context.setVariable('response.header.content-type', 'text/plain');
    if(context.getVariable("log.targetRequest")!==null && context.getVariable("log.targetRequest").includes("form-data")){
        var dataArray = targetRequest.split(/(----------------------------[0-9]+)/g).filter(function (element) {
                return element.includes("Content-Disposition");
            }).map(function (element) {
                return element.replace(/[\r\n]/g, '');
            });

        var result = '{';
        
        dataArray.forEach(function (element) {
            var match = element.match(/Content-Disposition: form-data; name="([^"]+)"/);
            if (match) {
                var key = match[1];
                var value = element.substring(match[0].length);
                
                if (element.includes("filename")) {
                    var filenameMatch = value.match(/filename="([^"]+)"/);
                    var contentTypeMatch = value.match(/Content-Type: ([^\n]+)/);
                    var data = value.substring(filenameMatch[0].length + contentTypeMatch[0].length);
                    result+="\""+key+"\":{"
                    result += '"filename":'+'"'+filenameMatch[1]+'",';
                    result += '"data":' + '"' + data.trim() + '"}';
                } else {
                    var data = value.trim();
                    result += "\"" + key + "\":{"
                    result += '"data":'+'"'+data+'"}';
                }
                if (element !== dataArray[dataArray.length - 1]) result += ','
            }
        });
        result+='}'
        var formParamObj = JSON.parse(result);
    }
    
    
    context.setVariable("logProxyRequestURI", req_url);
    var logProxyRequestURI = req_url;
    var req_verb = context.getVariable('log.proxyVerb');
    var req_scheme = context.getVariable('log.proxyScheme');
    var req_host = context.getVariable('log.proxyHost');
    var req_request_uri = context.getVariable('log.proxyURI');
    req_request_uri = getPathFromUrl(req_request_uri);

    // 	context.setVariable("target.copy.pathsuffix", false);
    var req_url = req_scheme + "://" + req_host + req_request_uri;
    context.setVariable("logProxyRequestURI", req_url);
    var logProxyRequestURI = req_request_uri;

    /** Handle Proxy Request Verb Parameter for logging **/
    context.setVariable("logProxyRequestVerb", req_verb);
    var logProxyRequestVerb = req_verb;

    context.setVariable("logProxyRequestPayload2", proxyRequest);

    /** Handle Proxy Request Payload Parameter for logging **/
    var proxyRequest = context.getVariable("private.log.proxyRequest");
    if (proxyRequest !== null || proxyRequest === '') {
        context.setVariable("logProxyRequestPayload4", proxyRequest);
        if(!formParamObj || formParamObj===null){
            context.setVariable("logProxyRequestPayload4_type", typeof proxyRequest);
           var logProxyRequestPayload = JSON.stringify(proxyRequest);
           context.setVariable("logProxyRequestPayload-ruuned", logProxyRequestPayload);
        }
        context.setVariable("logProxyRequestPayload5", logProxyRequestPayload);
        context.setVariable("private.logProxyRequestPayload", logProxyRequestPayload);
    }

    context.setVariable("logProxyRequestPayload6", logProxyRequestPayload);

    /** Handle Proxy Response Headers for logging **/
    var respProxyheaderFieldsCollection = context.getVariable('response.headers.names') + '';
    respProxyheaderFieldsCollection = respProxyheaderFieldsCollection.substr(1, respProxyheaderFieldsCollection.length - 2);
    var respProxyheadersArray = respProxyheaderFieldsCollection.split(", ");
    if (respProxyheadersArray.length > 0) {
        var logProxyResponseHeaders = '{';
        for (var i = 0; i < respProxyheadersArray.length; i++) {
            if (respProxyheadersArray[i].toLowerCase() !== 'authorization') {
                if (i !== 0)
                    logProxyResponseHeaders = logProxyResponseHeaders + ',';
                logProxyResponseHeaders = logProxyResponseHeaders + '"' + respProxyheadersArray[i] + '":"' + context.getVariable('response.header.' + respProxyheadersArray[i]) + '"';
            }
        }
        logProxyResponseHeaders = logProxyResponseHeaders + "}";
        context.setVariable("logProxyResponseStr", logProxyResponseHeaders);
        var headersRes = JSON.parse(logProxyResponseHeaders);
        context.setVariable("logProxyResponseHeaders", headersRes);
    }

context.setVariable("logProxyRequestPayload7", logProxyRequestPayload);

    /** Handle Proxy Response Payload Parameter for logging **/

    var proxyResponse = context.getVariable("response.content");
    if (proxyResponse !== null || proxyResponse === '') {
        var logProxyResponsePayload = proxyResponse.replace(/"/g, '\"');
        context.setVariable("logProxyResponsePayload", proxyResponse);
    }

    var logmessage = [];
    logmessage.push({
        "request": {
            "headerParams": reqHeaders,
            "queryParams": queryParmObj != null ? queryParmObj : null,
            "formParams": formParamObj != null ? formParamObj : null,
            "verb": proxyVerb,
            "path": logProxyRequestURI,
            "requestBody": logProxyRequestPayload,
            "hostname": "apigee-acme"
        },
        "response": {
            "headerParams": headersRes,
            "statusCode": proxyResponseStatusCode,
            "responseBody": logProxyResponsePayload
        }
    });

    // Call logger proxy
    var messageCompliance = context.setVariable("logMessageCompliance", JSON.stringify(logmessage[0]));
    var workspaceId = context.getVariable("complianceWorkspace");
    var complianceKey = context.getVariable("complianceApikey");
    var complianceClient = context.getVariable("complianceClient");

    var headers = {
        'content-type': 'application/json',
        'x-client-secret': complianceKey,
        'x-client-id': complianceClient
    };
    var endpoint = context.getVariable("complianceHost");
    context.setVariable("endpoint", endpoint);

    var logRequest = new Request(endpoint, "POST", headers, JSON.stringify(logmessage[0]));
    context.setVariable("complianceRequestToHost", logRequest);
    var exchange = httpClient.send(logRequest, onComplete);
    context.setVariable("responseStr", context.getVariable("complianceResponse"));

} catch (error) {
    context.setVariable("errorPosting", JSON.stringify(error));
}

function onComplete(response, error) {
    if (response) {
        context.setVariable("complianceString", response);
        context.setVariable("complianceResponse", response.content);
    }
    else {
        context.setVariable("complianceResponse", "Whoops: " + error);
    }
}
function getPathFromUrl(url) {
    if(url === null){
        return "";
    }
    return url.split(/[?#]/)[0];
}
