async function del(count = 1) {
  for (let i = 0; i < count; i++) {
    await closeDialoge();
    let element = document.querySelector(
      "[data-testid=mwthreadlist-item-open] [aria-label=Menu]"
    );
    let menu = await openMenu(element);
    let items = menu.querySelectorAll("[role=menuitem]");
    let dButton = await getDeleteButton(items);
    let diloge = await openDeletePopUp(dButton);
    let delChat = await doDelete(diloge);
    console.log(`Chat ${i + 1} Delete status ${delChat ? "True" : "False"}`);
  }

  function doDelete(dlg) {
    return new Promise((resolve) => {
      if (dlg) {
        let deleteBtn = dlg.querySelector("[aria-label='Delete Chat']");
        if (deleteBtn) deleteBtn.click();
        setTimeout(() => {
          resolve(true);
        }, 300);
      } else resolve(false);
    });
  }

  function closeDialoge() {
    return new Promise((resolve) => {
      let diloge = document.querySelector(
        "[role=dialog][aria-label='Delete Chat']"
      );
      if (diloge) {
        console.log("closing", diloge);
        let closebtn = diloge.querySelector("[aria-label=Close]");
        if (closebtn) closebtn.click();
        setTimeout(async () => {
          let chkOther = await closeDialoge();
          resolve(chkOther);
          resolve(true);
        }, 10);
      } else resolve(true);
    });
  }

  function openDeletePopUp(dbtn) {
    return new Promise((resolve) => {
      dbtn.click();
      setTimeout(() => {
        let diloge = document.querySelector(
          "[role=dialog][aria-label='Delete Chat']"
        );
        resolve(diloge);
      }, 10);
    });
  }

  function getDeleteButton(menuitems) {
    return new Promise((resolve, reject) => {
      let button = false;
      if (menuitems.length)
        for (let index = 0; index < menuitems.length; index++) {
          if (menuitems[index].querySelector("span").innerHTML == "Delete Chat")
            button = menuitems[index];
        }
      resolve(button);
    });
  }

  function openMenu(el) {
    return new Promise((resolve, reject) => {
      el.click();
      setTimeout(() => {
        let menu = document.querySelector("[role=menu]");
        if (!menu) {
          el.click();
          setTimeout(() => {
            resolve(document.querySelector("[role=menu]"));
          }, 1);
        } else resolve(menu);
      }, 1);
    });
  }
}
