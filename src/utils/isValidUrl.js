import {
    URL_UNALLOWED_CHARS,
    URL_PORT,
    URL_TLD,
    URL_HOSTNAME,
} from "./regex";

import isString from "../helpers/isString";
import isOption from "../helpers/isOption";

const urlOptions = {
    protocols: ['http:', 'https:', 'ftp:'],
    requireTld: true, // TLD = Top Level Domain
    requireProtocols: true,
    requireHost: true,
    requirePort: false,
    allowParameters: true,
    allowFragments: true,
    allowProtocolRelativeUrls: true,
    allowDataUrls: false,
    allowUnderscores: false,
    allowTrailingDot: false,
    validateLength: true,
}

export default function isValidUrl(url, options) {
    
    if (!isString(url)) {
        throw new Error('Invalid URL. Please provide a valid string.');
    }

    try {

        isOption(options, urlOptions);
        options = { ...urlOptions, ...options};

        const urlObject = new URL(url);
        const urlProtocol = urlObject.protocol;
        const urlHostname = urlObject.hostname;
        const urlPort = urlObject.port;
        const urlHref = urlObject.href;
        const urlHash = urlObject.hash;
        const urlSearch = urlObject.search;

        // URL HREF //
        if (!options.allowUnderscores && urlHref.includes('_')) {
            console.error("Underscores are not allowed.");
            return false;
        } else if (options.allowUnderscores && urlHref.includes('_')) {
            console.warn("Underscores are allowed in hostnames but not recommended.");
        }

        // URL TLD //
        const urlTld = urlHostname.split('.').pop();
        console.log("Tld: ", urlTld);
        if (options.requireTld && (!urlTld || !URL_TLD.test(urlTld) || !isNaN(urlTld))) {
            return false;
        }
        if (options.requireTld && urlTld.match(/^\d/)) {
            return false;
        }

        // URL PROTOCOLS //
        console.log("Protocol: ", urlProtocol);
        if (options.requireProtocols && !options.protocols.includes(urlProtocol)) {
            return false;
        }

        if (urlProtocol === 'mailto:') {
            throw new Error('Invalid URL. mailto: URLs are not allowed.');
        }

        if (urlProtocol === 'data:') {
            if (options.allowDataUrls) {
                console.warn('Data URLs are not recommended.');
            } else {
                return false;
            }
        }

        // URL REGEX CHECK//
        if (!options.protocols.includes(urlProtocol) || URL_UNALLOWED_CHARS.test(urlHref)) {
            return false;
        }

        // URL HOSTNAME //
        if (options.requireHost && !urlHostname) {
            throw new Error('Hostname is required.');
        }

        let hostnameParts = urlHostname.split('.');
        let dots = hostnameParts.length - 1;

        if (!URL_HOSTNAME.test(urlHostname) || dots < 1) {
            throw new Error('Invalid hostname. A valid hostname should contain at least one dot with a valid TLD.');
        }

        for (let part of hostnameParts) {
            if (part.startsWith('-') || part.endsWith('-')) {
                throw new Error('Invalid hostname. A valid hostname should not start or end with a hyphen.');
            }
        }

        if (!options.allowTrailingDot && urlHostname.endsWith('.')) {
            return false;
        }

        // URL PORT //

        // If port is required but not present, return false
        if (options.requirePort && urlPort === null) {
            console.error('Port is required but not present. Please provide a port.');
            return false;
        }
        
        // If port is present, validate its format and range 
        if (options.requirePort && urlPort !== null) {
            const port = parseInt(urlPort, 10);
        
            // Validate against a regex and numeric range
            if (!URL_PORT.test(urlPort) || port <= 0 || port > 65535) {
                console.error('Invalid port. Please provide a valid port between 0-65535.');
                return false;
            }
        }

        // URL LENGTH //
        if (options.validateLength && urlHref.length > 2083) {
            console.error('URL is too long. Please provide a shorter URL.');
            return false;
        }

        // URL FRAGMENTS //
        if (!options.allowFragments && urlHash) {
            return false;
        }

        // URL PARAMETERS //
        if (!options.allowParameters && urlSearch) {
            return false;
        }

        // URL PROTOCOL RELATIVE //
        if (urlProtocol === '//:') {
            if (options.allowProtocolRelativeUrls) {
                console.warn('Protocol relative URLs are less secure. Please consider using a protocol.');
            } else {
                return false;
            }
        }

        return true;


    } catch (error) {

        return false;

    }

};