export var requireAll = function (requireContext) { return requireContext.keys().map(requireContext); };
var svgs = require.context("", false, /\.svg$/);
requireAll(svgs);
