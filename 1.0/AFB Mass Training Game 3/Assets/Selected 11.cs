using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class Selected11 : MonoBehaviour
{


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
    public GameObject tryAgain;
    //public Keypad getQuiz;

    public GameObject Answer1;
    public GameObject Answer2;
    public GameObject Answer3;
    public GameObject Answer4;
    public GameObject Answer5;
    public GameObject Answer6;
    public GameObject Answer7;
    public GameObject Answer8;
    public GameObject Answer9;
    public GameObject Answer10;

    private GameObject textF;
    private GameObject text1Instance;

    private bool alreadyClicked;
    private TMP_Text[] answerTexts;

    private bool passed;

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




        questionCounter.text = "1";//(int.Parse(questionCounter.text) + 1).ToString();
        counter.text = "0";



        //Debug.Log("Next text instantiated");
        //nextText.transform.SetParent(parent.transform, false);
        //GameObject dNext = Instantiate(nextD, parent.transform);
        //Debug.Log("dNext instantiated");
        //dNext.transform.SetParent(parent.transform, false);
        
        TMP_Text textA1 = Answer1.GetComponent<TMP_Text>();
        TMP_Text textA2 = Answer2.GetComponent<TMP_Text>();
        TMP_Text textA3 = Answer3.GetComponent<TMP_Text>();
        TMP_Text textA4 = Answer4.GetComponent<TMP_Text>();
        TMP_Text textA5 = Answer5.GetComponent<TMP_Text>();
        TMP_Text textA6 = Answer6.GetComponent<TMP_Text>();
        TMP_Text textA7 = Answer7.GetComponent<TMP_Text>();
        TMP_Text textA8 = Answer8.GetComponent<TMP_Text>();
        TMP_Text textA9 = Answer9.GetComponent<TMP_Text>();
        TMP_Text textA10 = Answer10.GetComponent<TMP_Text>();
        textA1.text = "-";
        textA2.text = "-";
        textA3.text = "-";
        textA4.text = "-";
        textA5.text = "-";
        textA6.text = "-";
        textA7.text = "-";
        textA8.text = "-";
        textA9.text = "-";
        textA10.text = "-";

        next.gameObject.SetActive(true);
        nextA.gameObject.SetActive(true);
        nextB.gameObject.SetActive(true);
        nextC.gameObject.SetActive(true);
        nextD.gameObject.SetActive(true);
        text1.gameObject.SetActive(false);

        tryAgain.gameObject.SetActive(false);

    }
}
