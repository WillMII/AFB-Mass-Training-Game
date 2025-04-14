using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class ExitRoom2 : MonoBehaviour
{

    public ActivateClue Keyboard;
    public ShelfClue safe;
    public ShelfClue ideaPoster;
    public ShelfClue trashCan;
    public CountingTypes2 counter;

    public GameObject finishText;
    public Keypad Keypad;

    private bool canExit;
    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {

    }




    void OnMouseDown()
    {
        canExit = Keypad.getCanExit();
        //canExit = Keyboard.getAlrClk() && safe.getAlrInst() && ideaPoster.getAlrInst() && trashCan.getAlrInst() && counter.getNumFound() == 4;
        if (canExit)
        {
            Instantiate(finishText.gameObject);
        }
    }
}
