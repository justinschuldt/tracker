import React, { useState } from 'react'
import { Button, Modal, Typography } from 'antd'
import {
  TableOutlined,
  GoogleOutlined,
  // SearchOutlined,     // choose sheet
  FileSearchOutlined, // choose sheet
  // FileSyncOutlined, // file auto-sync
  ExportOutlined,   // file sync outboud
  ImportOutlined,   // file sync inbound
  // CloudDownloadOutlined, // cloud sync inbound
  // CloudUploadOutlined,   // cloud sync outbound
  // CloudSyncOutlined,     // cloud auto-sync
} from '@ant-design/icons'
import { ISeries } from '../../data/models/Series'
import { IRecord } from '../../data/models/Record'
import { google as GoogleType } from 'googleapis' // just for the types

// import * as auth from 'google-auth-library'

const { Title, Text } = Typography

const apiKey = String(process.env.REACT_APP_PICKER_API_KEY) 

// The Browser API key obtained from the Google API Console.
// Replace with your own Browser API key, or your own key.
var developerKey = String(process.env.REACT_APP_PWA_OATH_CLIENT_SECRET)  // replace wtih client_id.json "client_secret" 

// The Client ID obtained from the Google API Console. Replace with your own Client ID.
var clientId = String(process.env.REACT_APP_PWA_OATH_CLIENT_ID)  // replace with client_id.json "web.client_id"  

// Replace with your own project number from console.developers.google.com.
// See "Project number" under "IAM & Admin" > "Settings"
var appId = "habit-graphics";

// Scope to use to access user's Drive items.
var scope = ['https://www.googleapis.com/auth/drive.file'];

interface SheetsSyncProps {
  series?: ISeries
  records?: IRecord[]
}
export const SheetsSync = (props: SheetsSyncProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  // const [signedIn, setSignedIn] = useState<boolean>(false)
  const [accessToken, setAccessToken] = useState<string>()
  const [sheetChosen, setSheetChosen] = useState<boolean>(false)
  const [pickerApiLoaded, setPickerApiLoaded] = useState<boolean>(false)


  const signInOld = () => {
    (window as any).gapi.load('auth', {'callback': apiAuthLoaded})    
  }
  const apiAuthLoaded = () => {
    console.log('apiAuthLoaded')
    const gapi = (window as any).gapi as typeof GoogleType
    const a = new gapi.auth.OAuth2({
      clientId, 
      clientSecret: developerKey,  
      redirectUri: 'http://localhost:3000/auth'
    })
    console.log('a: ', a)
  }
  const signIn = () => {
    const oauth2client = new (window as any).gapi.auth.OAuth2Client(clientId, developerKey, 'http://localhost:3000/auth');
    const authUrl = oauth2client.generateAuthUrl({
      access_type: 'offline',
      scope
    });
    console.log('authUrl: ', authUrl);
  }
  const signInWindowGapi = () => {
    (window as any).gapi.load('client:auth2', {'callback': onAuthApiLoad});
  }
  function onAuthApiLoad() {
    console.log('onAuthApiLoaded');
    (window as any).gapi.auth2.authorize(
        {
          'client_id': clientId,
          'scope': scope,
          'immediate': false
        },
        handleAuthResult);
  }
  const pickSheet = () => {
      // google.load('picker', {callback: onPickerApiLoad})
      console.log('pick spreadsheet')
      debugger
  }
  const loadPickerWindowGapi = () => {
      (window as any).gapi.load('picker', {'callback': onPickerApiLoad});
  }

    function onPickerApiLoad(pickerResult: any) {
      console.log('onPickerApiLoaded ', pickerResult)
      setPickerApiLoaded(true)
      if (accessToken) {
        // createPickerWindowGapi(accessToken)
      }
    }

    function handleAuthResult(authResult: any) {
      console.log('handleAuthResult: ', authResult)
      if (authResult && !authResult.error) {
        setAccessToken(authResult.access_token)
        if (pickerApiLoaded) {
          console.log('goning to call createPickerWindowGapi')
          createPickerWindowGapi();
        }
      }
    }

    // Create and render a Picker object for searching images.
    function createPickerWindowGapi() {
      console.log('createPickerWindowGapi ')
      const oauthToken = accessToken
      if (oauthToken) {
        const google = (window as any).google as typeof GoogleType

        // const docs = google.picker.ViewId.DOCS
        // var view = new google.picker.View(docs) //.setOAuthToken(oauthToken)
        // view.setMimeTypes("image/png,image/jpeg,image/jpg");
        console.log('oauthToken: ', oauthToken)
        // console.log('developerKey: ', developerKey)
        var picker = new google.picker.PickerBuilder()
            .enableFeature(google.picker.Feature.NAV_HIDDEN)
            // .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
            .setAppId(appId)
            .setOAuthToken(oauthToken)
            .addView(google.picker.ViewId.SPREADSHEETS)
            // .addView(new google.picker.DocsUploadView())
            .setDeveloperKey(apiKey)
            .setCallback(pickerCallback)
            .build();
         picker.setVisible(true);
      }
    }

    function updateSigninStatus(isSignedIn: any) {
      console.log('isSignedIn: ', isSignedIn);
    }

    // A simple callback implementation.
    function pickerCallback(data: any ) {
      console.log('pickerCallback data: ', data)
      if (data.action  == (window as any).google.picker.Action.PICKED) {
        var fileId = data.docs[0].id;
        alert('The user selected: ' + fileId);

        const result =  {
          "id": "get this from the picker result?",
        };
        const googleApi = (window as any).gapi as typeof GoogleType
        debugger
        var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
        var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
        googleApi.client.init({
          apiKey,
          clientId,
          discoveryDocs: DISCOVERY_DOCS,
          scope: [scope[0], SCOPES]
        }).then(function () {
          // Listen for sign-in state changes.
          // googleApi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          debugger
          googleApi.client.sheets.spreadsheets.values.get({
            spreadsheetId: result.id,
            range: 'Sheet1'
          }).then((response: any) => {
            var result = response.result;
            var numRows = result.values ? result.values.length : 0;
            debugger
            console.log(`${numRows} rows retrieved.`);
          }, (err: any) => {
            console.log('error: ', err)
            debugger
          });


        }, function(error: any) {
          console.log('error: ', error);
        });
      }
    }
  const syncToSheet = () => { console.log('syncToSheet') }
  const syncFromSheet = () => { console.log('syncFromSheet') }
  const toggleAutoSync = () => { console.log('toggleAutoSync') }

  const buttonProps = {
    style: { margin: '4px' },
    type: "primary" as any,
    size: "small" as any,
    shape: "round" as any
  }
  return (
    <div>
      <TableOutlined style={{ fontSize: 22 }} onClick={() => setModalVisible(true)} />
      <Modal
        title={<Title level={4} style={{ margin: 0 }}>Sync with Google Sheets</Title>}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <div>
          <Typography>
            <Title level={4} style={{ margin: 0 }}>Sign In</Title>
            <Text className="indent">then save your data to a Google Sheet</Text>
          </Typography>
          <div className="indent">
            <div className="indent">
              <Button
                type="primary"
                {...buttonProps}
                onClick={signIn}
                icon={<GoogleOutlined />}
              >
                signIn
              </Button>
              </div>
                  {/* TEMP */}
                  <div className="indent">
                  <Button
                    type="primary"
                    {...buttonProps}
                    onClick={signInWindowGapi}
                    icon={<GoogleOutlined />}
                  >
                    signIn window.gapi
                  </Button>
            </div>
          </div>
        </div>

        <div>
          <Typography>
            <Title level={4} style={{ margin: 0 }}>Pick a Sheet to sync with</Title>
            <Text className="indent">from your Google Drive:</Text>
          </Typography>
          <div className="indent">
            <div className="indent">
              <Button
                type="primary"
                {...buttonProps}
                onClick={pickSheet}
                icon={<FileSearchOutlined />}
              >
                pickSheet
              </Button>
            </div>
            <div className="indent">
              <Button
                type="primary"
                {...buttonProps}
                onClick={loadPickerWindowGapi}
                icon={<FileSearchOutlined />}
              >
                loadPicker - window.gapi
              </Button>
            </div>
            <div className="indent">
              <Button
                type="primary"
                {...buttonProps}
                onClick={createPickerWindowGapi}
                icon={<FileSearchOutlined />}
              >
                createPicker - window.gapi
              </Button>
            </div>
          </div>
        </div>

        {sheetChosen ? (
          <div style={{ marginTop: 16 }}>
            <Typography>
              <Title level={4} style={{ margin: 0 }}>manually sync data</Title>
              <Text className="indent">for your active Sheet:</Text>
            </Typography>
            <div className="indent">
              <div className="indent">
                <Button
                  type="primary"
                  {...buttonProps}
                  onClick={syncToSheet}
                  icon={<ExportOutlined />}
                >
                  sync to Google Sheet
                    </Button>
                <Button
                  type="primary"
                  {...buttonProps}
                  onClick={syncFromSheet}
                  icon={<ImportOutlined />}
                >
                  sync from a Google Sheet  
                </Button>
              </div>
            </div>
          </div>
            
        ) : null}
      </Modal>
    </div>
  )
}
