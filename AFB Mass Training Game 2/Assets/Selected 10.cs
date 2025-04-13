using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class Selected10 : MonoBehaviour
{


    public GameObject text;
    public TMP_Text text1;
    public bool correct;
    public TMP_Text counter;
    public TMP_Text questionCounter;

    public GameObject next;
    private GameObject parent;
    private Keypad parentK;

    public GameObject nextA;
    public GameObject nextB;
    public GameObject nextC;
    public GameObject nextD;
    public GameObject currentA;
    public GameObject currentB;
    public GameObject currentC;
    public GameObject currentD;
    //public Keypad getQuiz;
    public GameObject finishText;
    public GameObject failText;
    
    private GameObject textF;
    private GameObject text1Instance;

    private bool alreadyClicked;
    private TMP_Text[] answerTexts;

    private bool passed = false;

    void Start()
    {
        //GameObject keypad = GameObject.Find("Keypad");
        //parentK = keypad.GetComponent<Keypad>();
        //parent = parentK.getInstance();

    }

    // Update is called once per frame
    void Update()
    {

    }

    public void OnClick()
    {




        questionCounter.text = (int.Parse(questionCounter.text) + 1).ToString();

        TMP_Text textT = text.GetComponent<TMP_Text>();
        string answer = this.gameObject.name;
        if (answer == "A 10 Variant")
        {
            textT.text = "A";

        }
        else if (answer == "B 10")
        {
            textT.text = "B";
            

        }
        else if (answer == "C 10")
        {
            textT.text = "C";
        }
        else if (answer == "D 10 Variant")
        {
            textT.text = "D";
            correct = true;

        }
        //textT.text = "D";
        /*
        if (text.gameObject.name == "Answer 1")
        {
            correct = true;
            Debug.Log("Correct");
        }
        */
        if (correct == true)
        {
            counter.text = (int.Parse(counter.text) + 1).ToString();
        }
        if (int.Parse(counter.text) >= 7)
        {
            passed = true;
        } else
        {
            passed = false;
        }

        Debug.Log("Next text instantiated");
        //nextText.transform.SetParent(parent.transform, false);
        //GameObject dNext = Instantiate(nextD, parent.transform);
        Debug.Log("dNext instantiated");
        //dNext.transform.SetParent(parent.transform, false);
        text1.gameObject.SetActive(false);
        
        currentA.gameObject.SetActive(false);
        currentB.gameObject.SetActive(false);
        currentC.gameObject.SetActive(false);
        currentD.gameObject.SetActive(false);
        if (passed == false)
        {
            failText.gameObject.SetActive(true);
            nextD.gameObject.SetActive(true);
            //nextA.gameObject.SetActive(true);
            //nextB.gameObject.SetActive(true);
            //nextC.gameObject.SetActive(true);
            //nextD.gameObject.SetActive(true);
        }
        else
        {
             finishText.gameObject.SetActive(true);
        }


    }

    public bool didPass()
    {
        return passed;
    }
}
