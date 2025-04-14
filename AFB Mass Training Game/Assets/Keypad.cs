using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class Keypad : MonoBehaviour
{

    //public ActivateClue Keyboard;
    //public ShelfClue safe;
    //public ShelfClue ideaPoster;
    //public ShelfClue trashCan;
    //public CountingTypes2 counter;
    public ActivateClue Keyboard;
    public ShelfClue safe;
    public ShelfClue ideaPoster;
    public ShelfClue trashCan;
    public CountingTypes2 counter;
    public GameObject Quiz;
    private GameObject quizInstance;
    //public GameObject finishText;

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
        canExit = Keyboard.getAlrClk() && safe.getAlrInst() && ideaPoster.getAlrInst() && trashCan.getAlrInst() && counter.getNumFound() == 4;
        if (canExit)
        {
            //quizInstance = Instantiate(Quiz.gameObject);
            Quiz.SetActive(true);
        }
    }

    public GameObject getInstance()
    {
        return quizInstance;
    }

    public bool getCanExit()
    {
        return canExit;
    }
}
