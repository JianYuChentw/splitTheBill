# **Split The Bill** 
![專案封面圖](logs/splitTheBill.webp)

## **介紹**
與好友出遊總是在計算各自負擔多少錢，而覺得麻煩嗎？這個專案就是為你處理麻煩的計算的小幫手，可以從平均分攤到佔比分攤。
每次記帳時，還會先向好友確認是否符合本次分攤金額。確認後才能完成這次消費記錄。

# **身份管理功能**

## **註冊**
>註冊使用者。

- **URL**
  >/users/register

 **Method:**

  `POST`
- **URL Params**

  `none`

- **Required:**
      **Body:**

    ```json
      {
        "username": "String", // 用戶名
        "phoneNumber": "String", // 電話號碼
        "password": "String", // 密碼
        "email": "String" // 電子郵件地址
      }
    ```

- **Success Response:**
  >註冊成功

    **Content:**
    `(登入成功，給予權限)`
    <br />
    ```json
    {
        "code": 200, // Number
        "message": "成功。" // String
    }

    ```

- **Error Response:**
  >註冊失敗

    **Content:**
    `(登入失敗)`
    ```json
        {
        "code":401, //Number
        "message": "登入失敗，請重新確認名稱或密碼。" //String
        }
    or
        {
        "code": 409, // Number
        "message": "電話號碼已存在。" // String
        }
    or
        {
        "code": 500, // Number
        "message": "系統發生錯誤。" // String
        }

    ```

## **登入**
>輸入帳號密碼，登入使用者。

- **URL**
  >/users/login

 **Method:**

  `POST`
- **URL Params**

  `none`

- **Required:**
      **Body:**

    ```json
      {
      "username": "String", //用戶名
      "password": "String" //密碼
      }
    ```

- **Success Response:**
  >登入成功
    **Content:**
    `(登入成功，給予權限)`
    <br />
    ```json
    {
        "code":200, //Number
        "message": "成功。" //String
    }
    ```

- **Error Response:**
  >登入失敗
    **Content:**
    `(登入失敗)`
    ```json
    {
        "code":401, //Number
        "message": "登入失敗，請重新確認名稱或密碼。" //String
    }
    or
    {
        "code": 500, // Number
        "message": "系統發生錯誤。" // String
    }
    ```



## **登出**
>登出使用者

- **URL**
  >/users/logout

 **Method:**

  `Delete`
- **URL Params**

  `none`

- **Success Response:**
  >登出成功

    **Content:**
    `(登出成功)`
    <br />
    ```json
    {
        "code":200, //Number
        "message": "成功。" //String
    }
    ```

- **Error Response:**
  >登入失敗
  - **Code:** 401 <br />
    **Content:**
    `(登入失敗)`
    ```json
    {
        "code": 500, // Number
        "message": "系統發生錯誤。" // String
    }
    ```



<!-- TODO:補上相關response -->
## **獲取使用者資訊**
>獲取使用者基本資料

- **URL**
  >/users/resume

 **Method:**

  `GET`
- **URL Params**

  `none`

- **Success Response:**
  >登出成功

    **Content:**
    `(取得資訊)`
    <br />
    ```json
    {
        "code":200, //Number
        "message": "成功。" //String
    }
    ```

- **Error Response:**
  >
  - **Code:** 401 <br />
    **Content:**
    `(登入失敗)`
    ```json
    {
        "code": 500, // Number
        "message": "系統發生錯誤。" // String
    }
    ```


- [ ] 修改密碼
- [ ] 帳單資訊
- [ ] 變更帳單狀態




