function openTab(tabName, categoryName, element, buttonCategory) {
    let tabs = document.getElementsByClassName(categoryName);
    let tabButtons = document.getElementsByClassName(buttonCategory)
    for (let i = 0; i < tabs.length; i++) tabs[i].style.display = "none"
    for (let i = 0; i < tabButtons.length; i++)
        tabButtons[i].className = tabButtons[i].className.replace(" active", "")
    document.getElementById(tabName).style.display = "block"
    element.className += " active"
}