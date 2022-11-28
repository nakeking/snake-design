export function fillFieldNames(fieldNames) {
    var _a = fieldNames || {}, label = _a.label, value = _a.value, children = _a.children;
    return {
        label: label || "label",
        value: value || "value",
        children: children || "children",
    };
}
