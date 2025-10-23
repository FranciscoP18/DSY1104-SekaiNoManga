export function anyMoneyTextPresent(container = document.body) {
  return /[\$\d\.\,]/.test(container.textContent || "");
}
