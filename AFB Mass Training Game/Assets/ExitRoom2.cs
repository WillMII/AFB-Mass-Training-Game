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
    public Selected10 A10;
    public Selected10 B10;
    public Selected10 C10;
    public Selected10 D10;


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
        canExit = A10.didPass() || B10.didPass() || C10.didPass() || D10.didPass();
        //canExit = Keyboard.getAlrClk() && safe.getAlrInst() && ideaPoster.getAlrInst() && trashCan.getAlrInst() && counter.getNumFound() == 4;
        if (canExit)
        {
            Instantiate(finishText.gameObject);
        }
    }
}
