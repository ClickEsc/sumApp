export const isBrowser = typeof window !== "undefined";
export const basepath = process.env.NODE_ENV === "production" ? "/sumApp" : "/";

export const checkInputNumericOnly = (e) => {
  // Разрешаем: backspace, delete, tab и escape
  if (e.keyCode === 46 || e.keyCode === 8 || e.keyCode === 9 || e.keyCode === 27 ||

    // Разрешаем: Ctrl+A
    ((e.ctrlKey || e.metaKey) && e.keyCode === 65) ||

    // Разрешаем: Ctrl+C / Cmd+C
    ((e.ctrlKey || e.metaKey) && e.keyCode === 67) ||

    // Разрешаем: Ctrl+V / Cmd+V
    ((e.ctrlKey || e.metaKey) && e.keyCode === 86) ||

    // Разрешаем: Ctrl+X / Cmd+X
    ((e.ctrlKey || e.metaKey) && e.keyCode === 88) ||

    // Разрешаем: home, end, влево, вправо
    (e.keyCode >= 35 && e.keyCode <= 39))
  {
    return
  } else {
    // Запрещаем все, кроме цифр на основной клавиатуре, а так же Num-клавиатуре
    if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105 )) {
      e.preventDefault()
    }
  }
}